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
    <el-sub-menu index="/instruction">
        <template #title>
            <span class="menu-item"><el-icon><Document/></el-icon>起步文档</span>
        </template>
        <el-menu-item class="menu-sub-item" @click="queryArticleDetail(10012)">已实现&未实现</el-menu-item>
        <el-menu-item class="menu-sub-item">本站说明</el-menu-item>
        <el-menu-item class="menu-sub-item">环境搭建</el-menu-item>
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
        <el-sub-menu index="7">
            <template #title>
                <span class="menu-item"><el-icon><Document/></el-icon>Linux环境</span>
            </template>
            <el-menu-item index="3-1" class="menu-sub-item">Linux配置JDK</el-menu-item>
            <el-menu-item index="3-1" class="menu-sub-item">Linux配置Tomcat</el-menu-item>
            <el-menu-item index="3-1" class="menu-sub-item">Linux配置MySQL</el-menu-item>
            <el-menu-item index="3-1" class="menu-sub-item">Linux配置Maven</el-menu-item>
            <el-menu-item index="3-1" class="menu-sub-item">Linux配置RocketMQ</el-menu-item>
            <el-menu-item index="3-1" class="menu-sub-item">Linux配置Nginx</el-menu-item>
            <el-menu-item index="3-1" class="menu-sub-item">Linux配置Redis</el-menu-item>
        </el-sub-menu>
        -->
    <el-sub-menu index="4">
        <template #title>
            <span class="menu-item"><el-icon><View/></el-icon>休闲</span>
        </template>
        <el-menu-item index="4-1" class="menu-sub-item"><el-icon><Picture/></el-icon>照片</el-menu-item>
        <el-menu-item index="4-2" class="menu-sub-item"><el-icon><VideoPlay/></el-icon>音频</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/comments" class="menu-item"><el-icon><ChatLineRound/></el-icon>评论区</el-menu-item>
</template>

<script>
import {
    ChatLineRound,
    Collection,
    Compass,
    Document,
    FolderOpened,
    House,
    VideoPlay,
    View
} from "@element-plus/icons-vue";
import {queryArticleDetail} from "@/store";

export default {
    name: "MenuList",
    methods: {queryArticleDetail},
    components: {Document, FolderOpened, Collection, VideoPlay, View, ChatLineRound, House, Compass}
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