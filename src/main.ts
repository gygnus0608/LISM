import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import './style.css'
import App from './App.vue'

// 引入routes
import router from "./routes/index";
import api from './api/api';

// 引入pinia
const pinia = createPinia()

const app = createApp(App)
// 全局挂载api
app.config.globalProperties.$api = api
app.use(pinia)
app.use(router)
app.mount('#app')
