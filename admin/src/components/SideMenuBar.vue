<template>
    <div class="article-menu-bar">
        <h1>管理菜单</h1>
        <el-menu
            :router="true"
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
        </el-menu>
    </div>
</template>

<script>
import {Location, Document, Setting, Menu} from "@element-plus/icons-vue";
import {ref} from "vue";

export default {
    name: "SideMenuBar",
    components: {Menu, Setting, Document, Location},
    setup() {

    }
}
</script>

<style scoped>
.article-menu-bar {
    margin-left: 2vw;
    width: 8vw;
}

.article-menu-bar:not(.el-menu--collapse) {
    width: 10vw;
    min-height: 10vh;
}
</style>