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
import VueLuckyCanvas from '@lucky-canvas/vue'

const app = createApp(App)
app.use(ElementPlus, {locale: zhCn})
app.use(VueLuckyCanvas)
app.use(router)
// app.use(*)必须要在mount之前调用，否则组件内部无法使用
app.mount('#app')

// 统一注册el-icon图标
for(let iconName in ElIconModules){
    app.component(iconName,ElIconModules[iconName])
}

// 解决ResizeObserver loop limit exceeded
const debounce = (fn, delay) => {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    }
}
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
    constructor(callback) {
        callback = debounce(callback, 16);
        super(callback);
    }
}
