import axios from 'axios'
import config from '../config'
const service = axios.create({
    baseURL:config.baseApi
})

// 请求拦截器
service.interceptors.request.use((req):any=>{
    return req
})
// 响应拦截器
service.interceptors.response.use((res):any=>{
    const code:number = res.data
    return res
},(err)=>{
    console.log(err)
})

// 封装的核心函数
function request(options:any){
    options.method = options.method || 'get'
    // if(options.method.toLowerCase() == 'get'){
    //     options.params = options.data
    // }
    // 对mock的处理
    let isMock = config.mock
    if(typeof options.mock !== 'undefined'){
        // 允许控制单个mock接口的开关
        isMock = options.mock
    }
    // 对线上环境做处理
    if(config.env == 'prod'){
        // 不能有用到mock的机会
        service.defaults.baseURL = config.baseApi
    }else{
        service.defaults.baseURL = isMock ? config.mockApi:config.baseApi
    }

    return service(options)
}
export default request