<template>
    <!--指定组件的呈现位置-->
    <!--给router-view绑定一个key，解决相同页面，不同的参数，数据不刷新的问题-->
    <router-view :key="router.currentRoute.value.fullPath"></router-view>
</template>

<script setup>

import router from "@/router";
</script>

<style>
/* 解决页面左右溢出 */
html, body {
    max-width: 100vw;

    overflow-x: hidden;
}

.el-menu--collapse .el-menu .el-sub-menu, .el-menu--popup{
    min-width: 6rem!important;
}

.el-menu-item-group__title {
    font-size: 18px!important;
    color: darkcyan!important;
    margin-left: -10px;
    font-weight: bolder;
}

.el-menu-item {
    /*font-size: 40px!important;*/
    margin-left: -1.5rem!important;
}

.el-sub-menu {
    margin-left: -1.5rem!important;
}

</style>
