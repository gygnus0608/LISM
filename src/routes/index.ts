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
                // 动态路由
                meta:{
                    isShow:false,
                    title:'首页'
                },
                component: () => import('../view/BasicData/allCustomer.vue')
            },
            {
                path:'/basicData',
                name: 'basicData',
                meta:{
                    isShow:true,
                    title:'基础数据管理'
                },
                children:[
                    {
                        path:'/baseData/customer',
                        name:'customer',
                        meta:{
                            isShow:true,
                            title:'客户信息列表'
                        },
                        component: () => import('../view/BasicData/allCustomer.vue')
                    },
                    {
                        path:'/baseData/allSupplier',
                        name:'allSupplier',
                        meta:{
                            isShow:true,
                            title:'供应商列表'
                        },
                        component: () => import('../view/BasicData/allSupplier.vue')
                    },
                    {
                        path:'/baseData/content',
                        name:'content',
                        meta:{
                            title:'检测项目维护'
                        },
                        children:[
                            {
                                path:'/baseData/content/allContentType',
                                name: 'allContentType',
                                meta:{
                                    isShow:true,
                                    title:'项目类型列表'
                                },
                                component: () => import('../view/BasicData/allContentType.vue')
                            },
                            {
                                path:'/baseData/content/allContent',
                                name: 'allContent',
                                meta:{
                                    isShow:true,
                                    title:'检测项目列表'
                                },
                                component: () => import('../view/BasicData/allContent.vue')
                            },
                        ]
                    },
                    {
                        path:'/baseData/testTemplate',
                        name:'testTemplate',
                        meta:{
                            isShow:true,
                            title:'检测模板列表'
                        },
                        component: () => import('../view/BasicData/allTestTemplate.vue')
                    },
                ]
            },
            {
                path:'/entrustment',
                name: 'entrustment',
                meta:{
                    isShow:true,
                    title:'委托管理'
                },
                children:[
                    {
                        path:'/entrustment/allEntrustment',
                        name:'allEntrustment',
                        meta:{
                            isShow:true,
                            title:'委托单列表'
                        },
                        component: () => import('../view/Entrustment/allEntrustment.vue')
                    },
                    {
                        path:'/entrustment/orderTestItem',
                        name:'orderTestItem',
                        meta:{
                            isShow:true,
                            title:'委托单下属检测项目'
                        },
                        component: () => import('../view/Entrustment/orderTestItem.vue')
                    },
                    {
                        path:'/entrustment/allCirculation',
                        name:'allCirculation',
                        meta:{
                            isShow:true,
                            title:'任务流转单'
                        },
                        component: () => import('../view/Entrustment/allCirculation.vue')
                    },
                    {
                        path:'/entrustment/flowNode',
                        name:'flowNode',
                        meta:{
                            isShow:true,
                            title:'流转节点管理'
                        },
                        component: () => import('../view/Entrustment/flowNode.vue')
                    },
                    {
                        path:'/entrustment/testContract',
                        name:'testContract',
                        meta:{
                            isShow:true,
                            title:'测试协议管理'
                        },
                        component: () => import('../view/Entrustment/testContract.vue')
                    },
                ]
            },
            {
                path:'/sample',
                name: 'sample',
                meta:{
                    isShow:true,
                    title:'样品管理'
                },
                children:[
                    {
                        path:'/sample/allSample',
                        name:'allSample',
                        meta:{
                            isShow:true,
                            title:'样品列表'
                        },
                        component: () => import('../view/Sample/Sample.vue')
                    },
                    {
                        path:'/sample/allSTtemplate',
                        name:'allSTtemplate',
                        meta:{
                            isShow:true,
                            title:'样品标签模板维护'
                        },
                        component: () => import('../view/Sample/allSTtemplate.vue')
                    },
                    {
                        path:'/sample/sampleLevel',
                        name:'sampleLevel',
                        meta:{
                            isShow:true,
                            title:'样品档次管理'
                        },
                        component: () => import('../view/Sample/sampleLevel.vue')
                    },
                    {
                        path:'/sample/sampleDetail',
                        name:'sampleDetail',
                        meta:{
                            isShow:true,
                            title:'样品处理方式'
                        },
                        component: () => import('../view/Sample/sampleDetail.vue')
                    }
                ]
            },
            {
                path:'/test',
                name: 'test',
                meta:{
                    isShow:true,
                    title:'任务管理'
                },
                children:[
                    {
                        path:'/test/notStarted',
                        name:'notStarted',
                        meta:{
                            isShow:true,
                            title:'未开始作业'
                        },
                        component: () => import('../view/Test/notStarted.vue')
                    },
                    {
                        path:'/test/Started',
                        name:'Started',
                        meta:{
                            isShow:true,
                            title:'已开始作业'
                        },
                        component: () => import('../view/Test/Started.vue')
                    },
                    {
                        path:'/test/Interrupted',
                        name:'Interrupted',
                        meta:{
                            isShow:true,
                            title:'已中断作业'
                        },
                        component: () => import('../view/Test/Interrupted.vue')
                    },
                    {
                        path:'/test/Completed',
                        name:'Completed',
                        meta:{
                            isShow:true,
                            title:'已完成作业'
                        },
                        component: () => import('../view/Test/Completed.vue')
                    },
                    {
                        path:'/test/Examine',
                        name:'Examine',
                        meta:{
                            isShow:true,
                            title:'已审核作业'
                        },
                        component: () => import('../view/Test/Examine.vue')
                    },
                    {
                        path:'/test/Result',
                        name:'Result',
                        meta:{
                            isShow:true,
                            title:'检测结果表'
                        },
                        component: () => import('../view/Test/Result.vue')
                    }
                ]
            },
            {
                path:'/report',
                name: 'report',
                meta:{
                    isShow:true,
                    title:'报告管理'
                },
                children:[
                    {
                        path:'/report/allReport',
                        name:'allReport',
                        meta:{
                            isShow:true,
                            title:'报告列表'
                        },
                        component: () => import('../view/Report/Report.vue')
                    },
                    {
                        path:'/report/reportMethod',
                        name:'reportMethod',
                        meta:{
                            isShow:true,
                            title:'报告方式'
                        },
                        component: () => import('../view/Report/ReportMethod.vue')
                    },
                    {
                        path:'/report/dataName',
                        name:'dataName',
                        meta:{
                            isShow:true,
                            title:'检测数据名称'
                        },
                        component: () => import('../view/Report/dataName.vue')
                    },
                ]
            },
            {
                path:'/equipment',
                name: 'equipment',
                meta:{
                    isShow:true,
                    title:'设备管理'
                },
                children:[
                    {
                        path:'/equipment/allEquipment',
                        name:'allEquipment',
                        meta:{
                            isShow:true,
                            title:'设备列表'
                        },
                        component: () => import('../view/Equipment/allEquipment.vue')
                    },
                    {
                        path:'/equipment/allService',
                        name:'allService',
                        meta:{
                            isShow:true,
                            title:'设备服务记录表'
                        },
                        component: () => import('../view/Equipment/allService.vue')
                    }
                ]
            },
            {
                path:'/file',
                name: 'file',
                meta:{
                    isShow:true,
                    title:'文件管理'
                },
                children:[
                    {
                        path:'/file/testFile',
                        name:'testFile',
                        meta:{
                            isShow:true,
                            title:'文件列表'
                        },
                        component: () => import('../view/File/fileService.vue')
                    },
                    {
                        path:'/file/fileType',
                        name:'fileType',
                        meta:{
                            isShow:true,
                            title:'文件类型'
                        },
                        component: () => import('../view/File/fileType.vue')
                    }
                ]
            },
            {
                path:'/analysis',
                name: 'analysis',
                meta:{
                    isShow:true,
                    title:'统计分析'
                },
                children:[
                    {
                        path:'/analysis/allChart',
                        name:'allChart',
                        meta:{
                            isShow:true,
                            title:'图表类型'
                        },
                        component: () => import('../view/Analysis/allChart.vue')
                    },
                    {
                        path:'/analysis/allAnalysis',
                        name:'allAnalysis',
                        meta:{
                            isShow:true,
                            title:'统计分析结果'
                        },
                        component: () => import('../view/Analysis/allAnalysis.vue')
                    }
                ]
            },
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
    },
]


// 路由
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to,from,next)=>{
    const token: string | null = localStorage.getItem('token')
    if(!token && to.path!=='/login'){
        next('/login')
    }else{
        next()
    }
})

// 导出
export default router
