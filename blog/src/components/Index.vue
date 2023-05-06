<template>
    <!--blog首页-->
    <el-container direction="vertical" class="base-container">
        <div id="header-blog">
            <FullPage/>
        </div>
        <el-container id="main-container">
            <div style=" position: absolute;width: 100vw">
                <Canvas style="width: 100vw"/>
            </div>
            <el-container style="position: absolute;width: 100vw">
                <div id="main-blog">
                    <Article/>
                </div>
                <div id="container-card">
                    <AsideBar/>
                </div>
            </el-container>
        </el-container>
    </el-container>
</template>

<script setup>

import Article from "@/components/Article.vue";
import FullPage from "@/components/FullPage.vue";
import AsideBar from "@/components/AsideBar.vue";
import Canvas from "@/components/Canvas.vue";

</script>

<style scoped>

#header-blog {
    background-image: url("https://time7.top:9000/blog/index.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    color: white;
}

#main-container {
}

#main-blog {
    width: 70%;
    margin-left: 8vw;
    margin-right: 10px;
}


#container-card {
    width: 20%;
    margin-bottom: 20px;
    margin-right: 8vw;
}

</style>
