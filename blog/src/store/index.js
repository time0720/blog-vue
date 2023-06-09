import {reactive, ref} from "vue";
import router from "@/router/index"
import axios from "axios";
import Cookies from 'js-cookie'
import {Map} from "core-js/internals/map-helpers";
import {ElMessage} from "element-plus";

export const baseUrl = 'https://time7.top:8000'

//判断当前是否登录
export let userInfoVisible
let token = Cookies.get('token')
userInfoVisible = !(token === undefined || token === '' || token === null);

//获取当前登录的用户信息
export const userDetailsDTO = reactive({
    user: {
        userId: null,
        userName: null,
        nickName: null,
        password: null,
        avatar: null,
        deleteFlag: null,
        creationDate: null,
        lastUpdateTime: null,
    },
    permissions: [],
    authorities: [
        {
            authority: null,
        }
    ],
    enabled: null,
    username: null,
    password: null,
    accountNonExpired: null,
    accountNonLocked: null,
    credentialsNonExpired: null,
})
export const getUserInfo = async () => {
    if (token !== undefined) {
        await axios.get(
            baseUrl + '/oauth/getUserInfo?token=' + token
        ).then(
            response => {
                userDetailsDTO.value = response.data
            }
        )
    }
}


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

//IP定位，如没有IP，则取HTTP之中的请求来进行定位
let addressInfo = reactive({
    status: null,
    info: null,
    infocode: null,
    province: null,
    city: null,
    adcode: null,
    rectangle: null
})
export const getCurrentAddress = async () => {
    await axios.get(
        'https://restapi.amap.com/v3/ip?key=a7a27bc3f08d0b30372d69b98f973b72'
    ).then(
        response => {
            addressInfo.value = response.data
        }
    )
}

//获取本地天气信息
export let weatherCurrentInfo = reactive({
    status: null,
    count: null,
    info: null,
    infocode: null,
    lives: []
})
export let weatherForecastInfo = reactive({
    status: null,
    count: null,
    info: null,
    infocode: null,
    forecasts: [
        {
            city: null,
            adcode: null,
            province: null,
            reporttime: null,
            casts: []
        }
    ]
})
export const getWeather = async () => {
    //1.先获取地址
    await getCurrentAddress()
    //2.获取实时天气(今天的)
    await axios.get(
        'https://restapi.amap.com/v3/weather/weatherInfo?key=dcae5349311800610d7d0975ccc9bcf9&extensions=base&city=' + addressInfo.value.adcode
    ).then(
        response => {
            weatherCurrentInfo.value = response.data
        }
    )
    //3.获取未来三天的天气
    await axios.get(
        'https://restapi.amap.com/v3/weather/weatherInfo?key=dcae5349311800610d7d0975ccc9bcf9&extensions=all&city=' + addressInfo.value.adcode
    ).then(
        response => {
            weatherForecastInfo.value = response.data
        }
    )
}


//登录
export const userForm = reactive({
    userName: null,
    password: null
})

export let tokenDTO = reactive({
    access_token: null,
    expires_in: null
})

export const submitForm = () => {
    //判断Cookie是否过期
    if (Cookies.get('token')) {
        // 跳转至index页面
        ElMessage({
            message: "您已登录，请勿重复登录～",
            type: "success"
        })
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    } else {
        axios.post(
            baseUrl + '/oauth/login', userForm
        ).then(
            response => {
                tokenDTO = response.data
                //存储token
                let milliSecond = new Date().getTime()
                let expiresTime = new Date(milliSecond + tokenDTO.expires_in * 1000)
                //是否有token或者是否合法
                if (tokenDTO.access_token === null || tokenDTO.access_token === undefined) {
                    //跳回登录页面
                    ElMessage.error('用户名或密码错误！')
                } else {
                    Cookies.set('token', tokenDTO.access_token, {expires: expiresTime})
                    // 跳转至index页面
                    ElMessage({
                        message: "登录成功，欢迎回来~",
                        type: "success"
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)
                }
            },
            error => {
                ElMessage({
                    message: "请求失败，请联系管理员！",
                    type: "error"
                })
            }
        )
    }
}

//注册
export const registerForm = reactive({
    userName: null,
    password: null,
    confirmPassword: null
})

export const registerUser = () => {
    if (registerForm.password.length < 8 || registerForm.confirmPassword.length < 8) {
        ElMessage({
            message: "密码长度不能小于8位！",
            type: "error"
        })
    } else {
        if (registerForm.password === registerForm.confirmPassword) {
            userForm.userName = registerForm.userName
            userForm.password = registerForm.password
            console.log(userForm)
            axios.post(
                baseUrl + '/oauth/register', userForm
            ).then(
                response => {
                    if (response.data.status === 200) {
                        ElMessage({
                            message: "注册成功！正在登录～",
                            type: "success"
                        })
                        //登录
                        submitForm()
                    } else if (response.data.status === 500) {
                        ElMessage({
                            message: response.data.message,
                            type: "error"
                        })
                    }
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)
                }
            )
        } else {
            ElMessage({
                message: "两次输入的密码不一致，请检查！",
                type: "error"
            })
        }
    }
}

//退出登录
const config = {
    headers: {'token': Cookies.get('token')}
}
export const logoutForm = () => {
    //删除token
    Cookies.remove('token')
    axios.get(
        baseUrl + '/oauth/logout', config
    ).then(
        response => {
            console.log('注销成功!', response.data)
        }
    )
    window.location.reload()
}
