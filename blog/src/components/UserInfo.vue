<template>
    <el-container direction="vertical">
        <div class="userInfo-header">
            <!--菜单栏nav-->
            <nav><MenuBar/></nav>
        </div>
        <el-container class="userInfo-main" direction="vertical">
            <div class="userInfo-content">
                <!--头像内容-->
                <el-row>
                    <el-col :span="7">
                        <el-row>
                            <span style="font-size: 1.5rem;font-weight: bold">公开头像</span>
                        </el-row>
                        <br>
                        <el-row>
                            <span style="font-size: 1rem">您可以在这里修改头像或删除当前头像</span>
                        </el-row>
                    </el-col>
                    <el-col :span="2">
                        <el-image :src="avatar" style="width: 8vw;border-radius: 50%"></el-image>
                    </el-col>
                    <el-col :span="1"></el-col>
                    <el-col :span="14">
                        <el-row>
                            <span style="font-size: 1.1rem;font-weight: bold">上传新头像</span>
                        </el-row>
                        <br>
                        <div style="width: 200px;">
                            <el-upload
                                    ref="upload"
                                    :limit="1"
                                    :auto-upload="false"
                                    action="#"
                                    :on-change="handleChange"
                                    v-model="userInfoForm.avatar"
                            >
                                <el-button type="default">选择文件...</el-button>
                            </el-upload>
                        </div>
                        <el-row>
                            <span style="font-size: 1rem">允许的最大文件大小为10M。</span>
                        </el-row>
                    </el-col>
                </el-row>
                <el-divider/>
                <!--主要信息内容-->
                <el-row>
                    <el-col :span="7">
                        <el-row>
                            <span style="font-size: 1.5rem;font-weight: bold">主要设置</span>
                        </el-row>
                        <br>
                        <el-row>
                            <span style="font-size: 1rem">此信息将出现在您的个人资料中。</span>
                        </el-row>
                    </el-col>
                    <el-col :span="17">
                        <el-form :model="userInfoForm">
                            <el-form-item label="昵称">
                                <el-input v-model="userInfoForm.nickName" style="width: 200px" :placeholder="nickName"/>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-input v-model="email" style="width: 200px" disabled/>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="userInfoForm.password" style="width: 200px"/>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <el-divider/>
                <el-row>
                    <el-button type="primary" @click="updateUserInfo">更新个人资料设置</el-button>
                    <el-button @click="cancelUpdate">取消</el-button>
                </el-row>
            </div>
        </el-container>
    </el-container>
</template>

<script setup>
import MenuBar from "@/components/menu/MenuBar.vue";
import {onMounted, reactive, ref} from "vue";
import {baseUrl, getUserInfo, userDetailsDTO} from "@/store";
import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router";
import axios from "axios";
import Cookies from "js-cookie";

// 用户信息
let avatar = ref('')
let userName = ref('')
let nickName = ref('')
let email = ref('')
onMounted(async () => {
    await getUserInfo()
    if (userDetailsDTO.value !== undefined) {
        let userInfo = userDetailsDTO.value.user
        avatar.value = userInfo.avatar
        userName.value = userInfo.userName
        nickName.value = userInfo.nickName
        email.value = userInfo.email
    }
})

const userInfoForm = reactive({
    nickName: null,
    password: null,
    avatar: null,
    token: null
})

const cancelUpdate = () => {
    ElMessage({
        type: "warning",
        message: '取消修改，正在跳转至首页。',
    })
    setTimeout(() => {
        router.push({name: 'index'})
    }, 1000)
}

//上传文件功能
let fileUpload = ref()
// 设置请求头
const headers = {
    'Content-Type': 'multipart/form-data'
}
const handleChange = (file) => {
    fileUpload.value = file
    console.log(file)
}
const uploadFile = async () => {
    if (fileUpload.value !== null && fileUpload.value !== '' && fileUpload.value !== undefined) {
        // 确定上传
        let param = new FormData()
        param.append("file", fileUpload.value.raw)
        // 发个后端
        let fileUrl
        const res = await axios.post(
            baseUrl + '/minio/upload', param
        )
        fileUrl = res.data.data
        if (res.data.status === 200) {
            ElMessage({
                message: '头像上传成功',
                type: 'success'
            })
        } else {
            ElMessage({
                message: '头像上传失败',
                type: 'error'
            })
        }
        userInfoForm.avatar = fileUrl
        console.log(userInfoForm)
    }
}

let token = Cookies.get('token')
const updateUser = async () => {
    userInfoForm.token = token
    ElMessageBox.confirm(
        '确定要保存当前的设置吗?',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(async () => {
        await axios.post(
            baseUrl + '/oauth/updateUser', userInfoForm
        ).then(
            response => {
                if (response.data.status === 200) {
                    ElMessage({
                        message: '用户信息修改成功，请重新登录',
                        type: "success"
                    })
                    Cookies.remove('token')
                    setTimeout(() => {
                        router.push({name: 'index'})
                    }, 1000)
                    setTimeout(() => {
                        window.location.reload()
                    }, 1200)
                } else {
                    ElMessage({
                        message: response.data.message,
                        type: "error"
                    })
                }
            }
        )
    })
}


const updateUserInfo = async () => {
    //1. 先上传头像，返回头像的URL
    await uploadFile()
    //2. 将token传递给后端，修改用户名密码
    await updateUser()
    // await location.reload()
}

</script>

<style scoped>
@media screen and (min-device-width: 768px) {

    .userInfo-header {
        background-image: url("https://time7.top:9000/blog/userInfo.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
        height: 30vh;
    }
}

@media screen and (max-device-width: 768px) {

    .userInfo-header {
        background-image: url("https://time7.top:9000/blog/userInfo.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
        height: 30vh;
    }
}

.userInfo-content {
    margin-top: 3vh;
    margin-left: 10vw;
    margin-right: 10vw;
}

</style>