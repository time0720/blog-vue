<template>
    <!--指定组件的呈现位置-->
    <router-view></router-view>
</template>

<script>

export default {
    name: 'App',
    components: {
    }
}
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
