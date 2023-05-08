<template>
    <div id="article-item">
        <el-row v-for="article in articleList.value" class="article-row">
            <el-card class="article-card">
                <el-row class="block">
                    <!--article.index % 2 === 0和下面的article.index % 2 === 1决定了图片和文字的左右控制-->
                    <el-col :span="10" class="el-col-img" v-if="article.index % 2 === 0">
                        <el-image :src=article.articlePicture @click="queryArticleDetail(article.articleId)" class="img"/>
                    </el-col>
                    <el-col :span="14" class="el-col-title" >
                        <p class="article-title" @click="queryArticleDetail(article.articleId)">{{article.articleTitle}}</p>
                        <span class="date"><el-icon size="larger"><Calendar/></el-icon>发布于 {{article.creationDate.substring(0,10)}}</span>
                        <span class="date"><el-icon size="larger"><Operation/></el-icon>文章类型: {{article.categoryName}}</span>
                    </el-col>
                    <el-col :span="10" class="el-col-img" v-if="article.index % 2 === 1">
                        <el-image :src=article.articlePicture @click="queryArticleDetail(article.articleId)" class="img"/>
                    </el-col>
                </el-row>
            </el-card>
        </el-row>
    </div>
</template>
<script setup>
import {Calendar, Operation} from "@element-plus/icons-vue";
import {articleList, queryArticleDetail} from "@/store"


</script>

<style scoped>

@media screen and (min-device-width: 768px) {
    .block {
        width: 60vw;
        height: 20vh;
    }

    .article-title {
        line-height: 80px;
        font-size: 26px;
        overflow: hidden;
        margin: 10px 40px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .date {
        margin: 10px 40px;
        display: flex;
    }
}

@media screen and (max-device-width: 768px) {
    .block {
        width: 90vw;
        height: 10vh;
    }

    .article-title {
        line-height: 1rem;
        font-size: 0.8rem;
        overflow: hidden;
        margin: 0.8rem 2rem;
    }

    .date {
        font-size: 0.8rem;
        margin: 0.8rem 1rem;
        display: flex;
    }
}

.article-row {
    margin-top: 10px;
    margin-bottom: 10px;
}

#article-item {
    margin-top: 20px;
}

.img {
    width: 100%;
    height: 100%;
    cursor: pointer;
}
.img :hover {
    transform: scale(1.4);
    transition: all 1.2s;
}


.article-title:hover {
    color: #409EFF;
    transform: translateX(2vh);
}

.el-col-img {
    width: 100%;
    height: 100%;
    margin: 0 auto;
}

.el-col-title {
    width: 100%;
    height: 100%;
    margin: 0 auto;
}

.article-card {
    height: 100%;
    margin: 0 auto;
}
</style>