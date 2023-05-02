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
</template>

<script>
import {inject, onMounted, provide, reactive, ref} from "vue";
import axios from "axios";
import ArticleItem from "@/components/ArticleItem.vue";

export default {
    name: "Article",
    components: {ArticleItem},
    setup: function () {
        const baseUrl = inject('baseUrl')

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
                categoryName: '',
                index: 0
            }]
        })
        let articleListQuery = reactive({
            pageNum: 1,
            pageSize: 5
        })

        onMounted(() => {
            selectArticles()
        })

        let total = ref(0)
        // const token = Cookies.get('token')
        const selectArticles = () => {
            axios.get(
                baseUrl + '/article/selectArticle', {
                    params: articleListQuery
                }
            ).then(
                response => {
                    articleList.value = response.data.data.list
                    articleList.value.forEach((article, index) => {
                        article.index = index
                    })
                    total.value = response.data.data.total
                }
            )
        }

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

        provide('articleList', articleList)

        return {
            articleList,
            total,
            handleSizeChange,
            handleCurrentChange,
            pageSize,
            currentPage
        }
    }
}
</script>

<style scoped>
.blog-pagination {
    margin-top: 50px;
    margin-bottom: 100px;
    margin-right: 20vw;
}
</style>