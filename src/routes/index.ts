import {createRouter, createWebHistory} from "vue-router";
import error from "../view/errorView.vue"

const routes= [
    {
        path: '/',
        component:()=>import('../view/Main.vue'),
        children:[
            {
                path:'/',
                name: 'home',
                component: () => import('../view/home/Home.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../view/loginView.vue')
    },
    {
        //配置404页面
        path: '/:catchAll(.*)',
        name: '404',
        component: error,
    }
]
// 路由
const router = createRouter({
    history: createWebHistory(),
    routes
})
// 导出
export default router
