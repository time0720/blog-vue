<template>
    <div id="main-blog">
        <el-card id="main-comments">
            <el-card class="comments-detail"
                     style="height: auto;overflow: auto"
                     v-for="comments in commentsList.value"
            >
                <el-row>
                    <el-col :span="2">
                        <el-image :src="comments.via" class="img"/>
                    </el-col>
                    <el-col :span="1"></el-col>
                    <el-col :span="21">
                        <span style="color: #409EFF;font-size: 1.4rem">{{comments.commentsName}}</span>
                        &nbsp;&nbsp;<el-icon><Location/></el-icon>
                        <span>{{comments.address}}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>{{comments.creationDate}}</span>
                        <span style="float: right">第 {{comments.index + 1}} 条</span>
                        <p>{{comments.content}}</p>
                        <!--TODO:完成回复和点赞功能-->
                        <!--                                <el-button style="float: right">回复</el-button>-->
                        <!--                                <el-button style="float: right"><el-icon><StarFilled/></el-icon>&nbsp;&nbsp;{{comments.upvote}}</el-button>-->
                    </el-col>
                </el-row>
            </el-card>
        </el-card>
        <!--分页组件-->
        <el-pagination
                background
                :page-sizes="[5, 10, 20]"
                layout="->, total, prev, pager, next, sizes"
                :total="commentsCount"
                class="blog-pagination"
                v-model:page-size="pageSize"
                v-model:current-page="currentPage"
                @update:page-size="handleSizeChange"
                @update:current-page="handleCurrentChange"
        />
    </div>
</template>

<script setup>
import {commentsCount, commentsList, currentPage, pageSize, selectComments} from "@/store";
import {Location} from "@element-plus/icons-vue";
import router from "@/router";

//根据路由来设置评论字段
let articleId
const Router = router.currentRoute.value
if (Router.fullPath === '/comments') {
    articleId = -1
} else if (Router.fullPath !== '/comments' && Router.params !== undefined && Router.params !== null) {
    articleId = Router.params.articleId
}
console.log(articleId)

//分页功能
const handleSizeChange = (value) => {
    pageSize.value = value
    console.log('pageSize', pageSize.value)
    selectComments(currentPage.value, value, articleId)
}
const handleCurrentChange = (value) => {
    currentPage.value = value
    console.log('currentPage', currentPage.value)
    selectComments(value, pageSize.value, articleId)
}

let dialogWidth
if (screen.width >= 768) {
    dialogWidth = '40%'
} else {
    dialogWidth = '90%'
}
</script>

<style scoped>
@media screen and (min-device-width: 768px) {

    #main-blog {
        width: 70%;
        margin-top: 20px;
        margin-left: 8vw;
        margin-right: 10px;
    }

    #main-comments {
        width: 100%;
    }
}


@media screen and (max-device-width: 768px) {

    #main-blog {
        width: 100vw;
    }

    #main-comments {
        width: 100%;
    }
}

.blog-pagination {
    margin-top: 50px;
    margin-bottom: 100px;
    margin-right: 20vw;
}

</style>