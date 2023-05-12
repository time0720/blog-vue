<template>
    <div id="aside-bar">
        <!--网站作者信息-->
        <el-card class="card-item">
            <div class="avatar-img">
                <el-image src="https://time7.top:9000/blog/web_head.jpg" />
            </div>
            <h1 class="avatar-name">时光</h1>
            <br>
            <h1><el-icon><ChatRound/></el-icon> ：QQ: 8074905</h1>
            <h1><el-icon><Message/></el-icon> ：8074905@qq.com</h1>
        </el-card>
        <!--网站运行时长信息-->
        <el-card class="card-item">
            <el-row class="info-row">本站已运行：</el-row>
            <el-row class="info-row"><el-icon><Timer/></el-icon>{{runningInfo}}</el-row>
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
import {ChatRound, Document, Message, Timer} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import {articleCount, commentsCount} from "@/store";

let runningInfo = ref(0)
onMounted(() => {
    setInterval(() => {
        runningInfo.value = runningChange()
    }, 1000)
})

const runningChange = () => {
    let startTime = new Date('2023-05-08 00:00:00').getTime()
    let currentTime = new Date().getTime()
    let runningTime = currentTime - startTime
    let day = Math.floor((runningTime) / (86400000)); //天
    let hours = Math.floor((runningTime % 86400000) / 3600000); //时
    let minutes = Math.floor((runningTime % 3600000) / 60000); //分
    let seconds = Math.floor((runningTime % 60000) / 1000); //秒
    return day + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 "
}
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

.info-row {
    margin-bottom: 2vh;
}
</style>