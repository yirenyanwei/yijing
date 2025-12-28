/**
 * Vue 应用入口文件
 * 负责初始化 Vue 应用、注册插件和挂载到 DOM
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia' // 状态管理库
import router from './router' // 路由配置
import App from './App.vue' // 根组件

// 引入 Vant 组件库样式
import 'vant/lib/index.css'

// 创建 Vue 应用实例
const app = createApp(App)

// 注册 Pinia 状态管理
app.use(createPinia())

// 注册 Vue Router
app.use(router)

// 挂载应用到 DOM（挂载到 index.html 中的 #app 元素）
app.mount('#app')

