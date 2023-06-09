<template>
    <el-container direction="vertical">
        <div class="archives-header">
            <!--菜单栏nav-->
            <nav><MenuBar/></nav>
            <!--背景图片和字体-->
            <div class="archives-bg">
                <h1>{{article.articleTitle}}</h1>
            </div>
        </div>
        <el-container direction="vertical" class="category-main">
            <el-container>
                <div id="main-blog">
                    <!--TODO: 目录的获取与展示-->
                    <el-card>
                        <MdEditor
                                v-model="article.articleContent"
                                :preview-only="true"
                        >
                        </MdEditor>
                    </el-card>
                </div>
                <div id="category-card">
                    <AsideBar/>
                </div>
            </el-container>
            <!--评论区-->
            <el-container class="comments-place" direction="vertical">
                <div>
                    <el-card class="add-comments">
                        <CommentsBtn/>
                    </el-card>
                </div>
                <CommentsContent/>
            </el-container>
        </el-container>
    </el-container>
</template>

<script setup>
import MenuBar from "@/components/menu/MenuBar.vue";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import AsideBar from "@/components/AsideBar.vue";
import {
    commentsInfo,
    currentPage,
    fillComments, getUserInfo,
    pageSize,
    queryArticleDetail,
    selectComments,
    userDetailsDTO
} from "@/store"
import router from "@/router/index"
import {onMounted, reactive,} from "vue";
import CommentsBtn from "@/components/comments/CommentsBtn.vue";
import CommentsContent from "@/components/comments/CommentsContent.vue";

let article = reactive({
    articleTitle: '',
    articleContent: ''
})

const articleId = router.currentRoute.value.params.articleId
queryArticleDetail(articleId).then(res => {
    let articleInfo = res
    article.articleTitle = articleInfo.articleTitle
    article.articleContent = articleInfo.articleContent
})

onMounted(async () => {
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

selectComments(1, 10000 ,articleId)
</script>

<style scoped>

@media screen and (min-device-width: 768px) {
    .archives-header {
        background-image: url("https://time7.top:9000/blog/lighthouse.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        width: 100vw;
        height: 50vh;
    }

    #main-blog {
        width: 63%;
        margin-top: 20px;
        margin-left: 10vw;
        margin-right: 8px;
    }


    #category-card {
        width: 20%;
        margin-bottom: 20px;
        margin-right: 8vw;
    }
}

@media screen and (max-device-width: 768px) {
    .archives-header {
        background-image: url("https://time7.top:9000/blog/lighthouse.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        width: 100vw;
        height: 30vh;
    }

    #main-blog {
        width: 100vw;
        min-height: 70vh;
        margin-top: 1rem;
        margin-left: 5vw;
        margin-right: 5vw;
    }
}

.category-main {
    background-image: url("https://time7.top:9000/blog/whiteblue.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

.archives-bg {
    color: white;
    text-align: center;
    margin-top: 10%;
    font-size: 1.5rem;
}


.add-comments {
    width: 61vw;
    height: 10vh;
    margin: 5vh 10vw 5vh 10vw;
}

</style>