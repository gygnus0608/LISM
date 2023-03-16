import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import './style.css'
import App from './App.vue'

// 引入routes
import router from "./routes/index";
// import api from './api/api';
// import scroll from 'vuescroll';
// import "vuescroll/dist/vuescroll.css"

// 引入pinia
const pinia = createPinia()

const app = createApp(App)
// 全局挂载api
// app.config.globalProperties.$api = api
app.use(pinia)
app.use(router)
// app.use(scroll)
app.mount('#app')
