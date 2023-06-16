<template>
    <!--后台首页-->
    <el-container direction="vertical" class="base-container">
        <HeaderBar/>
        <el-container class="main-container">
            <div>
                <SideMenuBar/>
            </div>
            <div class="user-container">
                <div class="user-query">
                    <el-row :gutter="10" class="user-query-row">
                        <el-col :span="3" class="span-font">用户名称:</el-col>
                        <el-col :span="7">
                            <el-input :prefix-icon="Search" v-model="userQuery.userName"></el-input>
                        </el-col>
                        <el-col :span="4"/>
                        <el-col :span="3" class="span-font">昵称:</el-col>
                        <el-col :span="7">
                            <el-input :prefix-icon="Search" v-model="userQuery.nickName"></el-input>
                        </el-col>
                    </el-row>
                </div>
                <!--查询btn-->
                <div class="memo-search-btn">
                    <el-row :gutter="0">
                        <el-col :span="20"></el-col>
                        <el-col :span="2">
                            <el-button type="primary" @click="selectUser">搜索</el-button>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="warning" @click="clear">重置</el-button>
                        </el-col>
                    </el-row>
                </div>
                <!--评论列表-->
                <div class="main-blog">
                    <el-table :data="userList.value"
                              border
                              style="width: 100%">
                        <el-table-column prop="userId" label="用户ID" width="150"/>
                        <el-table-column prop="userName" label="名称" width="150"/>
                        <el-table-column prop="nickName" label="昵称" width="150"/>
                        <el-table-column prop="avatar" label="头像" width="150">
                            <template #default="scope">
                                <el-avatar :src="scope.row.avatar"></el-avatar>
                            </template>
                        </el-table-column>
                        <el-table-column prop="email" label="邮箱" width="200"/>
                        <el-table-column prop="deleteFlag" label="删除标识" width="150"/>
                        <el-table-column prop="creationDate" label="创建时间" width="200"/>
                    </el-table>
                </div>
                <!--分页组件-->
                <el-pagination
                        background
                        :page-sizes="[5, 20, 50]"
                        layout="total, prev, pager, next, sizes"
                        :total="userCount"
                        class="user-pagination"
                        v-model:page-size="pageSize"
                        v-model:current-page="currentPage"
                        @update:page-size="handleSizeChange"
                        @update:current-page="handleCurrentChange"
                />
            </div>
        </el-container>
    </el-container>
</template>

<script setup>
import HeaderBar from "@/components/HeaderBar.vue";
import SideMenuBar from "@/components/SideMenuBar.vue";
import {onMounted, ref} from "vue";
import {selectUser, userCount, userList, userQuery} from "@/store";
import {Search} from "@element-plus/icons-vue";

let userName = ref('')
let nickName = ref('')
onMounted(() => {
    userQuery.userName = userName.value
    userQuery.nickName = nickName.value
    selectUser()
})

//分页功能
let pageSize = 10
const handleSizeChange = (value) => {
    userQuery.pageSize = value
    pageSize = value
    selectUser()
}
let currentPage = 1
const handleCurrentChange = (value) => {
    userQuery.pageNum = value
    currentPage = value
    selectUser()
}

const clear = () => {
    userQuery.userName = ''
    userQuery.nickName = ''
}

</script>

<style scoped>
.base-container {
    background-color: #FFFFFF;
    min-width: 100vw;
    min-height: 100vh;
}

.main-container {
    width: 95vw;
}

.user-container {
    margin-left: 2vw;
    margin-top: 5vh;
    width: 85vw;
    margin-bottom: 5vh;
}

.user-pagination {
    margin-top: 20px;
    margin-bottom: 20px;
    justify-content: center;
}

.user-query {
    margin-bottom: 5vh;
    text-align: right;
}

.user-query-row {
    margin-bottom: 2vh;
}

.span-font {
    line-height: 32px;
}

.main-blog {
    margin-top: 5vh;
}
</style>