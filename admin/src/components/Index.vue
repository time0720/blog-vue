<template>
    <!--后台首页-->
    <el-container direction="vertical" class="base-container">
        <div class="header-blog">
            <h1 class="title-blog">blog后台标题栏</h1>
            <el-button type="danger" @click="logoutForm">注销</el-button>
        </div>
        <el-container class="main-container">
            <div>
                <SideMenuBar/>
            </div>
            <div class="main-blog">
            </div>
        </el-container>
    </el-container>
</template>

<script setup>
import SideMenuBar from "@/components/SideMenuBar.vue";
import Cookies from "js-cookie";
import axios from "axios";
import {inject} from "vue";

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
</script>

<style scoped>
.title-blog {
    text-align: center;
}

.base-container {
    background-image: url("https://time7.top:9000/blog/back_index.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    min-width: 100vw;
    min-height: 100vh;
}

.header-blog {
    width: 100vw;
    height: 20vh;
}

.main-blog {
    background-image: url("https://time7.top:9000/blog/animal.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    margin-left: 2vw;
    width: 80vw;
}
</style>