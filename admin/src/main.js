import { createApp } from 'vue'
import App from './App.vue'
// 引入ElementUI组件库
import ElementPlus from 'element-plus'
// 引入ElementUI全部样式
import 'element-plus/theme-chalk/index.css'
// 引入el-icon图标
import * as ElIconModules from '@element-plus/icons-vue'
// 引入中文包
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// 引入路由
import router from './router/index.js'

const app = createApp(App)
app.use(ElementPlus, {locale: zhCn})
app.use(router)
//全局变量：URL地址
const baseUrl = 'http://localhost:8000'
//使用 provide 将全局变量变为响应式对象 --- 在setup模板中，通过inject('baseUrl')引入
app.provide('baseUrl', baseUrl)
//使用 globalProperties 将全局变量附加到 Vue 实例上 --- 直接通过{{baseUrl}}在模板中使用
app.config.globalProperties.$baseUrl = baseUrl
// app.use(*)必须要在mount之前调用，否则组件内部无法使用
app.mount('#app')

// 统一注册el-icon图标
for(let iconName in ElIconModules){
    app.component(iconName,ElIconModules[iconName])
}
