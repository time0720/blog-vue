<template>
    <el-container direction="vertical">
        <div class="comments-header">
            <!--菜单栏nav-->
            <nav><MenuBar/></nav>
        </div>
        <el-container class="comments-main" direction="vertical">
            <div id="today-card">
                <el-card>
                    <h1><el-icon size="larger"><Sunrise/></el-icon>天气信息</h1>
                    <Weather/>
                </el-card>
            </div>
        </el-container>
    </el-container>
</template>

<script setup >
import MenuBar from "@/components/MenuBar.vue";
import {Sunrise} from "@element-plus/icons-vue";
import Weather from "@/components/today/Weather.vue";

</script>

<style scoped>
@media screen and (min-device-width: 768px) {

    .comments-header {
        background-image: url("https://time7.top:9000/blog/weather.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
        height: 30vh;
    }
}

@media screen and (max-device-width: 768px) {

    .comments-header {
        background-image: url("https://time7.top:9000/blog/weather.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
        height: 30vh;
    }
}

#today-card {
    display: flex;
    justify-content: center;/*垂直居中*/
    align-items: center;/*水平居中*/
    margin: 1rem 10vw auto;
}

</style>