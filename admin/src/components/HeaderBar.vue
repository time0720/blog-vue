<template>
    <div class="header-blog">
        <el-row class="title-blog">
            <el-col :span="4">
                <h1>blog后台管理菜单</h1>
            </el-col>
            <el-col :span="16">
            </el-col>
            <el-col :span="4">
                <el-dropdown trigger="click"  class="title-btn">
                    <el-avatar :src="avatar"></el-avatar>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <el-avatar :src="avatar"></el-avatar>&nbsp;&nbsp;&nbsp;&nbsp;
                                <div>
                                    <el-row>
                                        <span style="font-size: 1rem">{{userName}}</span>
                                    </el-row>
                                    <el-row>
                                        <span style="font-size: 1rem">{{nickName}}</span>
                                    </el-row>
                                </div>
                            </el-dropdown-item>
                            <el-dropdown-item divided :icon="Setting" @click="logoutForm" style="color: red">
                                退出登录
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import Cookies from "js-cookie";
import axios from "axios";
import {getUserInfo, userDetailsDTO} from "@/store";
import {Setting} from "@element-plus/icons-vue";

const baseUrl = inject('baseUrl')

const config = {
    headers: {'token': Cookies.get('token')}
}
const logoutForm = () => {
    if (confirm('确定要注销当前用户吗？')) {
        //删除token
        Cookies.remove('token')
        axios.get(
            baseUrl + '/oauth/logout', config
        ).then(
            response => {
                console.log('注销成功!', response.data)
            }
        )
        window.location.reload()
    }
}

// 用户信息
let avatar = ref('')
let userName = ref('')
let nickName = ref('')
onMounted(async () => {
    await getUserInfo()
    if (userDetailsDTO.value !== undefined) {
        let userInfo = userDetailsDTO.value.user
        avatar.value = userInfo.avatar
        userName.value = userInfo.userName
        nickName.value = userInfo.nickName
    }
})

</script>

<style scoped>
.header-blog {
    width: 100vw;
    text-align: center;
}

.title-blog {
    background-color: #409EFF;
}

.title-btn {
    top: 25%;
    position: absolute;
}
</style>