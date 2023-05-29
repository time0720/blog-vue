<template>
    <!--后台首页-->
    <el-container direction="vertical" class="base-container">
        <HeaderBar/>
        <el-container class="main-container">
            <div>
                <SideMenuBar/>
            </div>
            <div class="main-blog">
                <!--评论列表-->
                <div class="main-blog">
                    <el-table :data="commentsList.value"
                              border
                              style="width: 100%">
                        <el-table-column prop="commentsId" label="评论ID" width="80"/>
                        <el-table-column prop="commentsName" label="评论人名称" width="100"/>
                        <el-table-column prop="ip" label="评论人的IP" width="150"/>
                        <el-table-column prop="address" label="评论人的地域地址" width="150"/>
                        <el-table-column prop="content" label="评论的内容" width="400"/>
                        <el-table-column prop="creationDate" label="评论的时间" width="170"/>
                        <el-table-column label="操作" fixed="right">
                            <template #default="scope">
                                <el-button @click="handleDelete(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!--分页组件-->
                <el-pagination
                        background
                        :page-sizes="[10, 20, 50]"
                        layout="total, prev, pager, next, sizes"
                        :total="total"
                        class="comments-pagination"
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

import SideMenuBar from "@/components/SideMenuBar.vue";
import {inject, onMounted, reactive, ref} from "vue";
import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";
import Cookies from "js-cookie";
import HeaderBar from "@/components/HeaderBar.vue";

const baseUrl = inject('baseUrl')
const commentsList = reactive({
    value: [{
        commentsId: null,
        commentsName: null,
        ip: null,
        address: null,
        creationDate: null,
        via: null,
        content: null,
        parentId: null,
        like: null,
        articleId: null,
        index: null
    }]
})

onMounted(() => {
    selectComments(1, 10)
})

let total = ref(0)
const selectComments = (pageNum, pageSize) => {
    axios.get(
        baseUrl + '/comments/selectComments', {
            params: {
                pageNum: pageNum,
                pageSize: pageSize
            }
        }
    ).then(
        response => {
            commentsList.value = response.data.data.list
            total.value = response.data.data.total
        }
    )
}

const handleDelete = async (row) => {
    ElMessageBox.confirm(
        '确定删除这条评论吗?',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
    .then(async () => {
        let token = Cookies.get('token')
        console.log(token)
        const res = await axios.post(
            baseUrl + '/admin/deleteComments?commentsId='+row.commentsId, row.commentsId,
            {
                headers: {
                    'content-type': 'application/json',
                    'token': token
                }
            }
        )
        console.log(res)
        if (res.data.status === 200) {
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
        } else if (res.data.status === 403) {
            ElMessage({
                type: "error",
                message: res.data.message,
            })
        }
        // 刷新当前页面
        setTimeout(() => {
            location.reload()
        }, 1000)
    })
    .catch(() => {
        ElMessage({
            type: 'info',
            message: '删除失败',
        })
    })
}

//分页功能
let pageSize = 10
const handleSizeChange = (value) => {
    pageSize = value
    console.log(pageSize)
    selectComments(currentPage, pageSize)
}
let currentPage = 1
const handleCurrentChange = (value) => {
    currentPage = value
    console.log(currentPage)
    selectComments(currentPage, pageSize)
}

</script>

<style scoped>

.base-container {
    background-image: url("https://time7.top:9000/blog/back_index.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    min-width: 100vw;
    min-height: 100vh;
}


.main-blog {
    width: 85vw;
}

.comments-pagination {
    margin-top: 20px;
    margin-bottom: 20px;
    justify-content: center;
}
</style>