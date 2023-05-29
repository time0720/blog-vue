<template>
    <!--后台首页-->
    <el-container direction="vertical" class="base-container">
        <HeaderBar/>
        <el-container class="main-container">
            <div class="menu-blog">
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
import HeaderBar from "@/components/HeaderBar.vue";

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


.base-container {
    background-image: url("https://time7.top:9000/blog/back_index.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    min-width: 100vw;
    min-height: 100vh;
}



.menu-blog {
    width: 15vw;
}

.main-blog {
    background-image: url("https://time7.top:9000/blog/animal.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    width: 85vw;
}

</style>