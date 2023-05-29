import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import { ElMessage } from "element-plus";

//注册路由
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('../components/Index.vue')
    },
    {
        path: '/article',
        name: 'article',
        component: () => import('../components/Article.vue')
    },
    {
        path: '/editor',
        name: 'editor',
        component: () => import('../components/ArticleEditor.vue')
    },
    {
        path: '/comments',
        name: 'comments',
        component: () => import('../components/Comments.vue')
    }
];
const router = createRouter({
// createWebHashHistory()是使用hash模式路由
// createWebHistory()是使用history模式路由
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next()
    } else {
        const token = Cookies.get('token');
        //token不存在
        if (token === null || token === '' || token === undefined) {
            ElMessage.error('快去登录！！！')
            next('/login')
        } else {
            next()
        }
    }
})

export default router;