<template>
    <el-menu-item index="/" class="menu-item">
        <el-icon><House/></el-icon>首页
    </el-menu-item>
    <el-sub-menu index="/category">
        <template #title>
            <span class="menu-item"><el-icon><Compass/></el-icon>目录</span>
        </template>
        <el-menu-item index="/archives" class="menu-sub-item">
            <el-icon><Collection/></el-icon>归档
        </el-menu-item>
        <el-menu-item index="/category" class="menu-sub-item">
            <el-icon><FolderOpened/></el-icon>分类
        </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/own-world">
        <template #title>
            <span class="menu-item"><el-icon><Document/></el-icon>小天地</span>
        </template>
        <el-menu-item index="/lucky-wheel" class="menu-sub-item">
            <el-icon><Food/></el-icon>吃什么？
        </el-menu-item>
        <el-menu-item index="/today" class="menu-sub-item">
            <el-icon><Sunrise/></el-icon>今日情况
        </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/instruction">
        <template #title>
            <span class="menu-item"><el-icon><Document/></el-icon>起步文档</span>
        </template>
        <el-menu-item class="menu-sub-item" @click="queryArticleDetail(10012)">已实现&未实现</el-menu-item>
        <el-menu-item class="menu-sub-item" @click="queryArticleDetail(10019)">本站说明</el-menu-item>
    </el-sub-menu>
    <!--
        <el-sub-menu index="3">
            <template #title>
                <span class="menu-item"><el-icon><Document/></el-icon>Java学习文档</span>
            </template>
            <el-menu-item-group title="Java">
                <el-menu-item index="3-1" class="menu-sub-item">Java基础</el-menu-item>
                <el-menu-item index="3-1" class="menu-sub-item">Spring</el-menu-item>
                <el-menu-item index="3-1" class="menu-sub-item">Spring Cloud</el-menu-item>
                <el-menu-item index="3-1" class="menu-sub-item">Spring Security</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="6">
            <template #title>
                <span class="menu-item"><el-icon><Document/></el-icon>前端学习文档</span>
            </template>
            <el-menu-item-group title="前端基础">
                <el-menu-item index="3-1" class="menu-sub-item">H5相关知识</el-menu-item>
                <el-menu-item index="3-1" class="menu-sub-item">C3相关知识</el-menu-item>
                <el-menu-item index="3-1" class="menu-sub-item">JS相关知识</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Vue框架">
                <el-menu-item index="3-1" class="menu-sub-item">Vue2.0</el-menu-item>
                <el-menu-item index="3-1" class="menu-sub-item">Vue3.0</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
        -->
        <el-sub-menu index="7">
            <template #title>
                <span class="menu-item"><el-icon><Document/></el-icon>从零开始</span>
            </template>
            <el-menu-item-group title="Linux环境搭建">
                <el-menu-item class="menu-sub-item" @click="queryArticleDetail(10020)">Linux环境搭建说明</el-menu-item>
                <el-menu-item class="menu-sub-item" @click="queryArticleDetail(10021)">Linux安装JDK</el-menu-item>
                <el-menu-item class="menu-sub-item" @click="queryArticleDetail(10023)">Linux安装Tomcat</el-menu-item>
                <el-menu-item class="menu-sub-item" @click="queryArticleDetail(10024)">Linux安装MySQL</el-menu-item>
                <el-menu-item class="menu-sub-item" @click="queryArticleDetail(10025)">Linux安装Maven</el-menu-item>
                <el-menu-item class="menu-sub-item" @click="queryArticleDetail(10026)">Linux安装RocketMQ</el-menu-item>
                <el-menu-item class="menu-sub-item" @click="queryArticleDetail(10027)">Linux安装Nginx</el-menu-item>
                <el-menu-item class="menu-sub-item" @click="queryArticleDetail(10028)">Linux安装Redis</el-menu-item>
                <el-menu-item class="menu-sub-item" @click="queryArticleDetail(10032)">Linux安装Elasticsearch</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="从0开始搭建">
                <el-menu-item class="menu-sub-item">计划中～</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
<!--    <el-sub-menu index="4">-->
<!--        <template #title>-->
<!--            <span class="menu-item"><el-icon><View/></el-icon>休闲</span>-->
<!--        </template>-->
<!--        <el-menu-item index="4-1" class="menu-sub-item"><el-icon><Picture/></el-icon>照片</el-menu-item>-->
<!--        <el-menu-item index="4-2" class="menu-sub-item"><el-icon><VideoPlay/></el-icon>音频</el-menu-item>-->
<!--    </el-sub-menu>-->
    <el-menu-item index="/comments" class="menu-item"><el-icon><Comment/></el-icon>评论区</el-menu-item>
</template>

<script>
import {
    ChatLineRound,
    Collection, Comment,
    Compass,
    Document,
    FolderOpened, Food,
    House, Sunrise,
    VideoPlay,
    View
} from "@element-plus/icons-vue";
import {queryArticleDetail} from "@/store";

export default {
    name: "MenuList",
    methods: {queryArticleDetail},
    components: {
        Sunrise,
        Food, Comment, Document, FolderOpened, Collection, VideoPlay, View, ChatLineRound, House, Compass}
}
</script>

<style scoped>

.menu-item {
    font-size: 1rem;
    font-weight: bolder;
    line-height: 3rem;
}

.menu-sub-item {
    color: black!important;
    margin-left: 0.5rem!important;
}
</style>