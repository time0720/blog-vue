<template>
    <div class="article-item">
        <ArticleItem/>
        <!--分页组件-->
        <el-pagination
                background
                :page-sizes="[5, 10, 20]"
                layout="->, total, prev, pager, next, sizes"
                :total="total"
                class="blog-pagination"
                v-model:page-size="pageSize"
                v-model:current-page="currentPage"
                @update:page-size="handleSizeChange"
                @update:current-page="handleCurrentChange"
        />
    </div>
    <div class="beian">
        <el-link href="https://beian.miit.gov.cn/" target="_blank">鄂ICP备2023006825号-1</el-link>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import ArticleItem from "@/components/ArticleItem.vue";
import {total, selectArticles, articleListQuery} from "@/store"

onMounted(() => {
    selectArticles()
})

//分页功能
let pageSize = ref(5)
const handleSizeChange = (value) => {
    articleListQuery.pageSize = value
    pageSize.value = value
    console.log('pageSize', pageSize.value)
    selectArticles()
}
let currentPage = ref(1)
const handleCurrentChange = (value) => {
    articleListQuery.pageNum = value
    currentPage.value = value
    console.log('currentPage', currentPage.value)
    selectArticles()
}

</script>

<style scoped>
.blog-pagination {
    margin-top: 50px;
    margin-bottom: 100px;
    margin-right: 20vw;
}

.beian {
    text-align: center;
    font-size: 20px;
}
</style>