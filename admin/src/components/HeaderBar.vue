<template>
    <div class="header-blog">
        <el-row class="title-blog">
            <el-col :span="4">
                <h1>blog后台管理菜单</h1>
            </el-col>
            <el-col :span="16">
            </el-col>
            <el-col :span="4">
                <el-button class="title-btn" type="danger" @click="logoutForm">注销</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>

</script>

<style scoped>
.header-blog {
    width: 100vw;
    text-align: center;
}

.title-blog {
    background-color: lightskyblue;
}

.title-btn {
    top: 25%;
    position: absolute;
}
</style>