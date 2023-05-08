<template>
    <div id="aside-bar">
        <!--网站作者信息-->
        <el-card class="card-item">
            <div class="avatar-img">
                <el-image src="https://time7.top:9000/blog/web_head.jpg" />
            </div>
            <h1 class="avatar-name">时光</h1>
            <br>
            <h1><el-icon><Phone/></el-icon> ：15971080935</h1>
            <h1><el-icon><Message/></el-icon> ：8074905@qq.com</h1>
        </el-card>
        <!--网站运行时长信息-->
        <el-card class="card-item">
            <!--
                1.文章数量
                2.运行天数
                3.总字数
                4.总访问量
                5.最后更新时间
            -->
        </el-card>
    </div>
</template>

<script setup>
import {Message, Phone} from "@element-plus/icons-vue";

</script>

<style scoped>

@media screen and (min-device-width: 768px) {

}

@media screen and (max-device-width: 768px) {
    #aside-bar {
        display: none;
    }
}

.card-item {
    height: 45vh;
    margin-top: 20px;
    margin-bottom: 20px;
}

.avatar-img {
    margin: 20px auto;
    width: 40%;
    height: 40%;
    clip-path: circle();
}

.avatar-name {
    text-align: center;
}
</style>