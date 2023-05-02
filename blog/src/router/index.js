import { createRouter, createWebHistory } from 'vue-router'

//注册路由
const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../components/Index.vue')
    },
    {
        path: '/archives',
        name: 'archives',
        component: () => import('../components/Archives.vue')
    },
    {
        path: '/category',
        name: 'category',
        component: () => import('../components/Category.vue')
    },
    {
        path: '/article/:articleId',
        name: 'article',
        component: () => import('../components/ArticleInfo.vue')
    }
];
const router = createRouter({
// createWebHashHistory()是使用hash模式路由
// createWebHistory()是使用history模式路由
    history: createWebHistory(),
    routes
});

export default router;