const env = import.meta.env.MODE || 'prod'

const EnvConfig:any = {
    // 开发环境
    development:{
        baseApi:'/api',
        mockApi:'https://www.fastmock.site/mock/0c62ca2d24e66db31b4dc6869ebb94b8/api'
    },
    // 测试环境
    test:{
        baseApi:'//test.future.com/api',
        mockApi:'https://www.fastmock.site/mock/0c62ca2d24e66db31b4dc6869ebb94b8/api'
    },
    // 线上环境
    pro:{
        baseApi:'//future.com/api',
        mockApi:'https://www.fastmock.site/mock/0c62ca2d24e66db31b4dc6869ebb94b8/api'
    },
}

export default {
    env,
    // mock总开关
    mock:true,
    ...EnvConfig[env]
}