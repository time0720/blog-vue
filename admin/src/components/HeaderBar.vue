<template>
    <div class="header-blog">
        <el-row class="title-blog">
            <el-col :span="4">
                <h1>blog后台管理菜单</h1>
            </el-col>
            <el-col :span="16">
            </el-col>
            <el-col :span="4">
                <el-button class="title-btn" type="danger" @click="logoutForm">注销</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import {inject} from "vue";
import Cookies from "js-cookie";
import axios from "axios";

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
.header-blog {
    width: 100vw;
    text-align: center;
}

.title-blog {
    background-color: lightskyblue;
}

.title-btn {
    top: 25%;
    position: absolute;
}
</style>