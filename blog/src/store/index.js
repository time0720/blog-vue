import {reactive, ref} from "vue";
import router from "@/router/index"
import axios from "axios";
import {Map} from "core-js/internals/map-helpers";

export const baseUrl = 'https://time7.top:8000'

//文章列表对象
export const articleList = reactive({
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

//文章查询-分页参数
export const articleListQuery = reactive({
    pageNum: 1,
    pageSize: 5
})

//分页查询的所有article
export const total = ref(0)
export const selectArticles = () => {
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

//根据月份排序-归档
export const articleMap = reactive(new Map())
axios.get(
    baseUrl + '/article/selectAll'
).then(
    response => {
        articleList.value = response.data.data
        articleList.value.forEach(article => {
            let currentYearMonth = article.creationDate.substring(0, 7)
            if (articleMap[currentYearMonth] === undefined) {
                articleMap[currentYearMonth] = []
            }
            let articleArr = articleMap[currentYearMonth]
            articleArr.push(article)
            articleMap.set(currentYearMonth, articleArr)
        })
    }
)

//根据ID-点击跳转
export const queryArticleDetail = async (articleId) => {
    let article
    await axios.get(
        baseUrl + '/article/detail/' + articleId
    ).then(
        response => {
            article = response.data.data
        }
    )
    let articleInfo = new Promise((resolve, reject) => {
        resolve(JSON.parse(JSON.stringify(article)))
        reject({})
    })
    await router.push({
        name: 'article',
        params: {articleId: articleId}
    })
    return articleInfo
}

