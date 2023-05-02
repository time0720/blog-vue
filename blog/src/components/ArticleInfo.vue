<template>
    <el-container direction="vertical">
        <div class="archives-header">
            <!--菜单栏nav-->
            <nav><MenuBar/></nav>
            <!--背景图片和字体-->
            <div class="archives-bg">
                <h1>{{articleInfo.articleTitle}}</h1>
            </div>
        </div>
        <el-container class="category-main">
            <div id="main-blog">
                <!--TODO: 目录的获取与展示-->
                <el-card>
                    <MdEditor
                            v-model="articleInfo.articleContent"
                            :preview-only="true"
                    >
                    </MdEditor>
                </el-card>
            </div>
            <div id="category-card">
                <AsideBar/>
            </div>
        </el-container>
    </el-container>
</template>

<script setup>
import MenuBar from "@/components/MenuBar.vue";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import AsideBar from "@/components/AsideBar.vue";

const articleInfo = history.state.articleInfo

</script>

<style scoped>
.archives-header {
    background-image: url("http://119.91.22.108:9000/blog/lighthouse.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    width: 100vw;
    height: 50vh;
}

.category-main {
    background-image: url("http://119.91.22.108:9000/blog/whiteblue.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
}

.archives-bg {
    color: white;
    text-align: center;
    margin-top: 10%;
    font-size: 30px;
}

#main-blog {
    width: 70%;
    margin-top: 20px;
    margin-left: 10vw;
    margin-right: 8px;
}


#category-card {
    width: 20%;
    margin-bottom: 20px;
    margin-right: 8vw;
}
</style>