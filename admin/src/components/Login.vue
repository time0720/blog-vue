<template>
    <div class="login-index">
        <div class="login-form">
            <el-form :model="userForm" label-position="right" label-width="80px" size="large">
                <el-form-item label="用户名:">
                    <el-input v-model="userForm.userName" type="text"/>
                </el-form-item>
                <el-form-item label="密码:">
                    <el-input v-model="userForm.password" type="password"/>
                </el-form-item>
                <el-form-item class="login-submit">
                    <el-button type="primary" @click="submitForm">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {inject, reactive} from "vue";
import axios from "axios";
import Cookies from 'js-cookie'
import {useRouter} from "vue-router";
import { ElMessage } from "element-plus";

export default {
    name: 'Login',
    setup: function () {
        const baseUrl = inject('baseUrl')

        const userForm = reactive({
            userName: '',
            password: ''
        })

        let tokenDTO = reactive({
            access_token: '',
            expires_in: ''
        })

        const router = useRouter()
        const submitForm = () => {
            //判断Cookie是否过期
            if (Cookies.get('token')) {
                // 跳转至index页面
                ElMessage({
                    message: "已登录，即将跳转至后台主页。",
                    type: "success"
                })
                setTimeout(() => {
                    router.push({name: 'index'})
                }, 1000)
            } else {
                axios.post(
                    baseUrl + '/oauth/login', userForm
                ).then(
                    response => {
                        console.log(response)
                        tokenDTO = response.data
                        console.log('请求成功', tokenDTO)
                        //存储token
                        let milliSecond = new Date().getTime()
                        let expiresTime = new Date(milliSecond + tokenDTO.expires_in * 1000)
                        console.log('expiresTime', expiresTime)
                        //是否有token或者是否合法
                        if (tokenDTO.access_token === null || tokenDTO.access_token === undefined) {
                            //跳回登录页面
                            ElMessage.error('用户名或密码错误！')
                        } else {
                            Cookies.set('token', tokenDTO.access_token, {expires: expiresTime})
                            // 跳转至index页面
                            ElMessage({
                                message: "登录成功，即将跳转~",
                                type: "success"
                            })
                            setTimeout(() => {
                                router.push({name: 'index'})
                            }, 1000)
                        }
                    },
                    error => {
                        console.log('请求失败了', error.message)
                        ElMessage({
                            message: "请求失败，请联系管理员！",
                            type: "error"
                        })
                    }
                )
            }
        }

        return {
            userForm,
            submitForm
        }
    }
}
</script>

<style scoped>
.login-index {
    width: 100vw;
    height: 100vh;
    background-image: url("https://time7.top:9000/blog/login.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    display: flex;
}

.login-form {
    width: 25%;
    height: auto;
    margin: 200px auto 0;
}

</style>