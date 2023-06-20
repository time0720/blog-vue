<template>
    <el-container direction="vertical">
        <div class="comments-header">
            <!--菜单栏nav-->
            <nav><MenuBar/></nav>
            <!--背景图片和字体-->
            <div class="comments-bg">
                <CommentsBtn/>
            </div>
        </div>
        <el-container class="comments-main">
            <CommentsContent/>
            <div id="comments-card">
                <AsideBar/>
            </div>
        </el-container>
    </el-container>
</template>

<script setup>

import MenuBar from "@/components/menu/MenuBar.vue";
import AsideBar from "@/components/AsideBar.vue";
import {onMounted} from "vue";
import {
    commentsInfo,
    currentPage,
    fillComments, getUserInfo,
    pageSize,
    selectComments, userDetailsDTO,
} from "@/store"
import router from "@/router";
import CommentsBtn from "@/components/comments/CommentsBtn.vue";
import CommentsContent from "@/components/comments/CommentsContent.vue";

onMounted(async () => {
    await selectComments(currentPage.value, pageSize.value, -1)
    //根据路由来设置评论字段
    const Router = router.currentRoute.value
    fillComments(Router)
    await getUserInfo()
    if (userDetailsDTO.value !== undefined) {
        let userInfo = userDetailsDTO.value.user
        commentsInfo.via = userInfo.avatar
        if (userInfo.nickName === undefined || userInfo.nickName === '' || userInfo.nickName === null) {
            commentsInfo.commentsName = userInfo.userName
        } else {
            commentsInfo.commentsName = userInfo.nickName
        }
    }
})

</script>

<style scoped>
@media screen and (min-device-width: 768px) {
    .comments-main {
        background-image: url("https://time7.top:9000/blog/white_snow.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
    }

    .comments-header {
        background-image: url("https://time7.top:9000/blog/skyhouse.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
        height: 80vh;
    }
    #comments-card {
        width: 20%;
        margin-bottom: 20px;
        margin-right: 8vw;
    }

}

@media screen and (max-device-width: 768px) {
    .comments-main {
        background-image: url("https://time7.top:9000/blog/white_snow.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
    }

    .comments-header {
        background-image: url("https://time7.top:9000/blog/skyhouse.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
        height: 30vh;
    }

}

.comments-bg {
    color: white;
    margin-top: 10%;
    font-size: 2rem;
}


</style>