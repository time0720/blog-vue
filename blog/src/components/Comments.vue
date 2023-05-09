<template>
    <el-container direction="vertical">
        <div class="comments-header">
            <!--菜单栏nav-->
            <nav><MenuBar/></nav>
            <!--背景图片和字体-->
            <div class="comments-bg">
                <el-button @click="dialogVisible = true">
                    来都来了，留个言吧～
                </el-button>
            </div>
        </div>
        <el-container class="comments-main">
            <div id="main-blog">
                <el-card id="main-comments">
                    <el-card class="comments-detail" style="height: auto" v-for="comments in commentsList.value">
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
                                <el-button style="float: right">回复</el-button>
                                <el-button style="float: right"><el-icon><StarFilled/></el-icon>&nbsp;&nbsp;{{comments.upvote}}</el-button>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-card>
            </div>
            <div id="comments-card">
                <AsideBar/>
            </div>
        </el-container>
    </el-container>

    <!--弹出框-->
    <el-dialog
        v-model="dialogVisible"
        title="我来留言啦~"
        :width="dialogWidth"
        :before-close="handleClose"
    >
        我的名字：<el-input style="width: 25%" v-model="commentsInfo.commentsName"></el-input>
        <el-input
                type="textarea"
                class="comments-text"
                :rows="12"
                v-model="commentsInfo.content"
        >
        </el-input>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveComments">确定</el-button>
          </span>
        </template>
    </el-dialog>
</template>

<script setup>

import MenuBar from "@/components/MenuBar.vue";
import AsideBar from "@/components/AsideBar.vue";
import {onMounted, ref} from "vue";
import {ElMessageBox} from "element-plus";
import {commentsInfo, commentsList, fillComments, saveComments, selectComments} from "@/store"
import {Location, StarFilled} from "@element-plus/icons-vue";
import router from "@/router";
import Cookies from "js-cookie"

//根据路由来设置评论字段
const Router = router.currentRoute.value
fillComments(Router)
console.log(commentsInfo)

//TODO：根据当前token设置头像
const token = Cookies.get('token')
if (token !== undefined && token !== null && token !== '') {
    commentsInfo.via = 'https://time7.top:9000/blog/web_head.jpg'
    commentsInfo.commentsName = '时光'
} else {
    commentsInfo.via = 'https://time7.top:9000/blog/tourists.jpg'
}

onMounted(() => {
    selectComments(-1)
})

let dialogVisible = ref(false)

const handleClose = (done) => {
    ElMessageBox.confirm('确定要退出吗？',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        done()
    })
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
    .comments-main {
        background-image: url("https://time7.top:9000/blog/white_snow.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
    }

    #main-blog {
        width: 70%;
        margin-top: 20px;
        margin-left: 8vw;
        margin-right: 10px;
    }

    #main-comments {
        width: 100%;
        height: 70%;
    }

    #comments-card {
        width: 20%;
        margin-bottom: 20px;
        margin-right: 8vw;
    }

    .comments-header {
        background-image: url("https://time7.top:9000/blog/skyhouse.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
        height: 80vh;
    }

    .comments-text {
        margin-top: 10px;
        height: 30vh;
        width: 100%;
    }

}

@media screen and (max-device-width: 768px) {
    .comments-main {
        background-image: url("https://time7.top:9000/blog/white_snow.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
        height: 100vh;
    }

    #main-blog {
        width: 100vw;
        margin-top: 2rem;
        margin-left: 5vw;
        margin-right: 5vw;
    }

    #main-comments {
        width: 100%;
        height: 50%;
    }

    .comments-header {
        background-image: url("https://time7.top:9000/blog/skyhouse.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
        height: 30vh;
    }

    .comments-text {
        margin-top: 10px;
        height: 30vh;
        width: 100%;
    }

}

.comments-bg {
    color: white;
    text-align: center;
    margin-top: 10%;
    font-size: 2rem;
}
</style>