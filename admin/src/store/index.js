import Cookies from 'js-cookie'
import {reactive, ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

export const baseUrl = 'https://time7.top:8000'
let token = Cookies.get('token')

//获取当前登录的用户信息
export const userDetailsDTO = reactive({
    user: {
        userId: null,
        userName: null,
        nickName: null,
        password: null,
        avatar: null,
        email: null,
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


// 查询所有的用户信息
export const userQuery = reactive({
    pageNum: 1,
    pageSize: 10,
    userName: null,
    nickName: null
})
export const userList = reactive({
    userId: null,
    userName: null,
    nickName: null,
    password: null,
    avatar: null,
    email: null,
    deleteFlag: null,
    creationDate: null,
    lastUpdateTime: null
})
export const userCount = ref(0)
export const selectUser = () => {
    axios.get(
        baseUrl + '/user/selectUser', {
            params: userQuery
        }
    ).then(
        response => {
            userList.value = response.data.data.list
            userCount.value = response.data.data.total
        }
    )
}

// 查询所有的时间线活动
export const activityList = reactive({
    value: [{
        activityId: null,
        content: null,
        timestamp: null,
        size: null,
        color: null,
        percentage: null,
        isEdit: null
    }]
})
export const activity = reactive({
    activityId: null,
    content: null,
    timestamp: null,
    size: null,
    color: null,
    percentage: null,
    isEdit: null
})
export const selectAllActivities = () => {
    axios.get(
        baseUrl + '/activity/selectAll'
    ).then(
        response => {
            activityList.value = response.data.data
            activityList.value.forEach(activity => {
                activity.isEdit = false
            })
        }
    )
}

// 保存时间线活动
export const saveArticle = async (article) => {
    const res = await axios.post(
        baseUrl + '/admin/saveActivity', article,
        {
            headers: {
                'content-type': 'application/json',
                'token': token
            }
        }
    )
    if (res.data.status === 200) {
        ElMessage({
            message: '保存成功！',
            type: "success"
        })
    }
    await location.reload()
}

// 查询所有的友链信息
export const friendLinkList = reactive({
    value: [{
        linkId: null,
        avatar: null,
        linkUrl: null,
        linkName: null,
        creationDate: null,
        deleteFlag: null,
        isEdit: null
    }]
})
export const friendLink = reactive({
    avatar: null,
    linkUrl: null,
    linkName: null,
    isEdit: null
})
export const selectFriendLink = () => {
    axios.get(
        baseUrl + '/friend/selectFriendLink'
    ).then(
        response => {
            friendLinkList.value = response.data.data
            friendLinkList.value.forEach(friend => {
                friend.isEdit = false
            })
        }
    )
}

// 添加友链信息
export const addFriendLink = async (friendLink) => {
    const res = await axios.post(
        baseUrl + '/admin/addFriendLink', friendLink,
        {
            headers: {
                'content-type': 'application/json',
                'token': token
            }
        }
    )
    if (res.data.status === 200) {
        ElMessage({
            message: '保存成功！',
            type: "success"
        })
    }
    await location.reload()
}