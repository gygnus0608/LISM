export interface ListInt{
    SERVICEID:number,
    SERVICENAME:string,
    SERVICETYPE:string,
    STATUS:string,
    SPUSERNAME:string,
    IMUSERNAME:string,
    SPONSORTIME:string,
    IMPLEMENTTIME:string,
    FINISHTIME:string,
    REMARKS:string
}
// 展示用户列表
export interface UserListInt{
    USERID:number,
    USERNAME:string,
}
export interface GetUserData{
    token:any
}
// 通过userName获取usertId
export interface GetUserId{
    token:any,
    userName:string
}
// 展示设备服务记录列表
export interface GetServiceData{
    token:any
}
// 通过Servicename获取Serviceid
export interface GetServiceId{
    token:any,
    serviceName:string
}
// 新增设备服务记录信息
export interface GetNewService{
    token:any,
    serviceId:number,
    serviceName:string,
    serviceType:string,
    status:string,
    spUserName:string,
    imUserName:string,
    sponsorTime:string,
    implementTime:string,
    finishTime:string,
    remarks:string,
}
// 修改设备服务记录信息
export interface GetUpdateService{
    token:any,
    serviceId:number,
    serviceName:string,
    serviceType:string,
    status:string,
    spUserName:string,
    imUserName:string,
    sponsorTime:string,
    implementTime:string,
    finishTime:string,
    remarks:string,
}
// 删除设备服务记录信息
export interface DeleteServiceInfo{
    token:any,
    serviceId:number
}
interface selectDataInt{
    page:number,//页码
    count:number,//总条数
    pagesize:number,//默认一页显示几条
}
export class InitData{
    selectData:selectDataInt={
        page:1,
        count:0,//总数
        pagesize:5 //一页放多少条数据
    }
    // 展示所有设备服务记录信息
    token:GetServiceData={
        token:localStorage.getItem('token')
    }
    // 通过ServiceName查询ServiceId
    getServiceId:GetServiceId={
        token:localStorage.getItem('token'),
        serviceName:''
    }
    // 删除设备服务记录信息
    deleteServiceInfo:DeleteServiceInfo={
        token:localStorage.getItem('token'),
        serviceId:1
    }
    // 添加设备服务记录信息
    getNewService:GetNewService={
        token:localStorage.getItem('token'),
        serviceId:1,
        serviceName:'',
        serviceType:'',
        status:'',
        spUserName:'',
        imUserName:'',
        sponsorTime:'',
        implementTime:'',
        finishTime:'',
        remarks:'',
    }
    // 修改设备服务记录信息
    getUpdateService:GetUpdateService={
        token:localStorage.getItem('token'),
        serviceId:1,
        serviceName:'',
        serviceType:'',
        status:'',
        spUserName:'',
        imUserName:'',
        sponsorTime:'',
        implementTime:'',
        finishTime:'',
        remarks:'',
    }
    list:ListInt[]=[]//展示的内容数据

    user:UserListInt[]=[]

    userToken:GetUserData={
        token:localStorage.getItem('token')
    }
    // 通过userName获取userId 
    getUserId:GetUserId={
        token:localStorage.getItem('token'),
        userName:''
    }
    
    updateIsShow=false
    insertIsShow=false
}