import {reactive, ref} from "vue";
import router from "@/router/index"
import axios from "axios";
import {Map} from "core-js/internals/map-helpers";
import {ElMessage} from "element-plus";

export const baseUrl = 'https://time7.top:8000'

//文章列表对象
export let articleList = reactive({
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
export const articleCount = ref(0)
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
            articleCount.value = response.data.data.total
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

//评论功能
export const commentsList = reactive({
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
export let pageSize = ref(5)
export let currentPage = ref(1)
export let commentsCount = ref(0)
export const selectComments = (pageNum, pageSize, articleId) => {
    axios.get(
        baseUrl + '/comments/selectComments', {
            params: {
                pageNum,
                pageSize,
                articleId
            }
        }
    ).then(
        response => {
            commentsCount.value = response.data.data.total
            //总页数
            let pageCount = Math.floor(commentsCount.value / pageSize) + 1
            //最后一页缺少的个数，不足一页的数量
            let lackCount = pageSize - commentsCount.value % pageSize
            commentsList.value = response.data.data.list
            let list = commentsList.value.reverse()
            list.forEach((comments, index) => {
                let sub = index + (pageCount - currentPage.value) * pageSize
                //当是最后一页时
                if (currentPage.value === pageCount) {
                    comments.index = sub
                } else {
                    comments.index = sub - lackCount
                }

            })
            commentsList.value = list.reverse()
        }
    )
}

export const commentsInfo = reactive({
    commentsId: null,
    commentsName: null,
    ip: null,
    address: null,
    creationDate: null,
    via: null,
    content: null,
    parentId: null,
    upvote: null,
    articleId: null
})
//获取当前的路由
export const fillComments = (Router) => {
    if (Router.fullPath === '/comments') {
        commentsInfo.articleId = -1
    } else if (Router.fullPath !== '/comments' && Router.params !== undefined && Router.params !== null) {
        commentsInfo.articleId = Router.params.articleId
    }
}
export const saveComments = async () => {
     const res = await axios.post(
        baseUrl + '/comments/addComments', commentsInfo,
        {
            headers: {
                'content-type': 'application/json'
            }
        }
    )
    //跳转回去
    if (res.data.status === 200) {
        ElMessage({
            message: '保存成功！',
            type: 'success'
        })
    } else if (res.data.status === 403) {
        ElMessage({
            type: "error",
            message: res.data.message,
        })
    }
    setTimeout(() => {
        location.reload()
    }, 1000)
}

//ES全局搜索功能：根据文章标题和内容搜索
export let searchArticleList = reactive([])
export const searchKeyWord = (keyword) => {
    console.log(keyword)
    if (keyword === null || keyword === undefined || keyword === '') {
        ElMessage.error('请输入搜索的内容！')
    } else {
        axios.get(
            baseUrl + '/article/findByEs?keyword=' + keyword
        ).then(
            response => {
                searchArticleList.value = response.data.data
                console.log(searchArticleList.value)
            }
        )
    }
}