<template>
    <el-container direction="vertical">
        <div class="archives-header">
            <!--菜单栏nav-->
            <nav><MenuBar/></nav>
            <!--背景图片和字体-->
            <div class="archives-bg">
                <h1>归档</h1>
            </div>
        </div>
        <el-container class="archives-main">
            <div id="main-blog">
                <h1>共有{{articleList.value.length}}篇文章</h1>
                <div v-for="(value, key) in articleMap" :key="key">
                    <div>
                        <h1>{{value[0]}}</h1>
                    </div>
                    <div v-for="article in value[1]">
                        <el-card class="article-card">
                            <el-row class="block">
                                <el-col :span="4" class="col-img">
                                    <el-image :src="article.articlePicture" @click="queryArticleDetail(article.articleId)" class="img"/>
                                </el-col>
                                <el-col :span="20" class="col-title" >
                                    <span class="date"><el-icon size="larger"><Calendar/></el-icon>{{article.creationDate.substring(0,10)}}</span>
                                    <p class="title" @click="queryArticleDetail(article.articleId)">{{article.articleTitle}}</p>
                                </el-col>
                            </el-row>
                        </el-card>
                    </div>
                </div>
            </div>
            <div id="archives-card">
                <AsideBar/>
            </div>
        </el-container>
    </el-container>
</template>

<script setup>
import MenuBar from "@/components/MenuBar.vue";
import AsideBar from "@/components/AsideBar.vue";
import {Calendar} from "@element-plus/icons-vue";
import {articleList, articleMap, queryArticleDetail} from "@/store"

</script>

<style scoped>
.archives-header {
    background-image: url("https://time7.top:9000/blog/archives.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    width: 100vw;
    height: 50vh;
}

.archives-main {
    background-image: url("https://time7.top:9000/blog/white_snow.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

.archives-bg {
    color: white;
    text-align: center;
    margin-top: 10%;
    font-size: 30px;
}

#main-blog {
    width: 70%;
    margin-left: 8vw;
    margin-right: 30px;
    margin-bottom: 100px;
}


#archives-card {
    width: 20%;
    margin-bottom: 20px;
    margin-right: 8vw;
}

.article-card {
    height: 100%;
    margin-top: 10px;
}

.block {
    height: 8vh;
    width: 100%;
}

.col-img {
    width: 100%;
    height: 100%;
    margin: 0 auto;
}

.img {
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.col-title {
    width: 100%;
    height: 100%;
    margin: 0 auto;
}

.title {
    margin-left: 20px;
    display: flex;
    color: darkblue;
    font-weight: bolder;
    cursor: pointer;
}

.date {
    margin-left: 20px;
    display: flex;
}

</style>