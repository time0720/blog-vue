<template>
    <el-aside class="article-menu-bar">
<!--        <h1>管理菜单</h1>-->
        <el-menu
            :router="true"
            background-color="#F0F2F5"
            class="el-menu-container"
        >
            <el-menu-item index="/index">
                <el-icon><setting/></el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-sub-menu index="1">
                <template #title>
                    <el-icon><Location/></el-icon>
                    <span>文章</span>
                </template>
                <el-menu-item index="/article">文章列表</el-menu-item>
                <el-menu-item index="/editor">新增文章</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/comments">
                <el-icon><ChatDotSquare/></el-icon>评论
            </el-menu-item>
            <el-menu-item index="/user">
                <el-icon><Avatar/></el-icon>用户
            </el-menu-item>
            <el-menu-item index="/timeline">
                <el-icon><Timer/></el-icon>活动
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script setup>
import {Location, Setting, ChatDotSquare, Avatar, Timer} from "@element-plus/icons-vue";

</script>

<style scoped>
.article-menu-bar {
    height: 100%;
}

.article-menu-bar:not(.el-menu--collapse) {
    width: 15vw;
    min-height: 15vh;
}

.el-menu-container {
    height: 100%;
}
</style>