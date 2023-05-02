<template>
    <!--blog首页-->
    <el-container direction="vertical" class="base-container">
        <div id="header-blog">
            <FullPage/>
        </div>
        <el-container id="main-container">
            <div id="main-blog">
                <Article/>
            </div>
            <div id="container-card">
                <AsideBar/>
            </div>
        </el-container>
    </el-container>
</template>

<script>

import Article from "@/components/Article.vue";
import FullPage from "@/components/FullPage.vue";
import AsideBar from "@/components/AsideBar.vue";

export default {
    name: 'Index',
    components: {
        AsideBar,
        FullPage,
        Article
    }
}
</script>

<style scoped>

#header-blog {
    background-image: url("http://119.91.22.108:9000/blog/index.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    color: white;
}

#main-container {
    background-image: url("http://119.91.22.108:9000/blog/white_snow.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
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
