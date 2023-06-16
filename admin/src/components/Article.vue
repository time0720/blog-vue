<template>
    <!--blog后台管理-->
    <el-container direction="vertical" class="base-container">
        <HeaderBar/>
        <el-container class="main-container">
            <div>
                <SideMenuBar/>
            </div>
            <div class="article-container">
                <!--文章查询条件-->
                <div class="article-query">
                    <el-row :gutter="10" class="article-query-row">
                        <el-col :span="3" class="span-font">ID:</el-col>
                        <el-col :span="7">
                            <el-input :prefix-icon="Search" v-model="articleQuery.articleId"></el-input>
                        </el-col>
                        <el-col :span="4"/>
                        <el-col :span="3" class="span-font">文章标题:</el-col>
                        <el-col :span="7">
                            <el-input :prefix-icon="Search" v-model="articleQuery.articleTitle"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" class="article-query-row">
                        <el-col :span="3" class="span-font">创建时间从:</el-col>
                        <el-col :span="7">
                            <el-input type="date" v-model="articleQuery.creationDateFrom"></el-input>
                        </el-col>
                        <el-col :span="4"/>
                        <el-col :span="3" class="span-font">创建时间至:</el-col>
                        <el-col :span="7">
                            <el-input type="date" v-model="articleQuery.creationDateTo"></el-input>
                        </el-col>
                    </el-row>
                </div>
                <!--查询btn-->
                <div class="memo-search-btn">
                    <el-row :gutter="0">
                        <el-col :span="18"></el-col>
                        <el-col :span="2">
                            <el-button type="danger" @click="deleteArticles">删除</el-button>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="primary" @click="selectArticles">搜索</el-button>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="warning" @click="clear">重置</el-button>
                        </el-col>
                    </el-row>
                </div>
                <!--文章列表-->
                <div class="main-blog">
                    <el-table :data="articleList.value"
                              @selection-change="handleSelectionChange"
                              border
                              style="width: 100%">
                        <el-table-column type="selection"/>
                        <el-table-column prop="articleId" label="文章ID" width="80"/>
                        <el-table-column prop="categoryName" label="类型名称" width="130"/>
                        <el-table-column prop="articleTitle" label="文章标题" width="200"/>
                        <el-table-column prop="deleteFlag" label="删除标识" width="90"/>
                        <el-table-column prop="userId" label="创建人ID" width="90"/>
                        <el-table-column prop="creationDate" label="创建日期" width="170"/>
                        <el-table-column prop="lastUpdateTime" label="最后更新日期" width="170"/>
                        <el-table-column label="操作" fixed="right">
                            <template #default="scope">
                                <el-button @click="handleEdit(scope.row)">编辑</el-button>
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
                        class="article-pagination"
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
import {inject, onMounted, reactive, ref, toRef, toRefs} from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import SideMenuBar from "@/components/SideMenuBar.vue";
import {Search} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {ElMessage, ElMessageBox} from "element-plus";
import HeaderBar from "@/components/HeaderBar.vue";

const baseUrl = inject('baseUrl')

//用来查询的条件
let articleQuery = reactive({
    articleId: '',
    articleTitle: '',
    creationDateFrom: '',
    creationDateTo: '',
    pageNum: 1,
    pageSize: 10
})

//查询的返回list
let articleList = reactive({
    value: [{
        articleId: 0,
        categoryId: 0,
        userId: 0,
        articleTitle: '',
        articleContent: '',
        articlePicture: '',
        deleteFlag: '',
        creationDate: '',
        lastUpdateTime: '',
        categoryName: ''
    }]
})

//查询
onMounted(() => {
    selectArticles()
})
let total = ref(0)
const selectArticles = () => {
    axios.get(
        baseUrl + '/article/selectArticle', {
            params: articleQuery
        }
    ).then(
        response => {
            articleList.value = response.data.data.list
            articleList.value.forEach(article => article.isEdit = false)
            total.value = response.data.data.total
        }
    )
}

// 删除
let multipleSelection = reactive([])
const handleSelectionChange = (val) => {
    multipleSelection = val
}

const deleteArticles = async () => {
    ElMessageBox.confirm(
        '确定删除这些文章吗?',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            let deleteIds = multipleSelection.map(item => item.articleId)
            let token = Cookies.get('token')
            const res = await axios.post(
                baseUrl + '/admin/deleteArticles', deleteIds,
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


//重置
const clear = () => {
    articleQuery.articleId = ''
    articleQuery.articleTitle = ''
    articleQuery.creationDateFrom = ''
    articleQuery.creationDateTo = ''
}

//编辑
const router = useRouter()
const handleEdit = (row) => {
    //跳转到编辑页面-和新增一样，新增不传参数，编辑带着这一行的数据
    const article = JSON.parse(JSON.stringify(row))
    router.push({name: 'editor', state: {article}})
}


//分页功能
let pageSize = 10
const handleSizeChange = (value) => {
    articleQuery.pageSize = value
    pageSize = value
    selectArticles()
}
let currentPage = 1
const handleCurrentChange = (value) => {
    articleQuery.pageNum = value
    currentPage = value
    selectArticles()
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

.article-container {
    margin-top: 5vh;
    margin-left: 2vw;
    width: 85vw;
}

.article-query {
    margin-bottom: 5vh;
    text-align: right;
}

.article-query-row {
    margin-bottom: 2vh;
}

.span-font {
    line-height: 32px;
}

.memo-search-btn {
    text-align: right;
    margin-top: 40px;
    margin-bottom: 20px;
}

.article-pagination {
    margin-top: 20px;
    margin-bottom: 20px;
    justify-content: center;
}
</style>