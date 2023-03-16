export interface ListInt{
    CUSTOMERID:number,
    CUSTOMERNAME:string,
    COMPANY:string,
    PHONE:string,
    ADDRESS:string,
    MAIL:string,
}
// 展示客户列表
export interface GetCustomerData{
    token:any
}
// 通过customerName获取customerId
export interface GetCustomerId{
    token:any,
    customerName:string
}
// 新增客户信息
export interface GetNewCustomer{
    token:any,
    customerId:number,
    customerName:string,
    company:string,
    phone:string,
    address:string,
    mail:string
}
// 修改客户信息
export interface GetUpdateCustomer{
    token:any,
    customerId:number,
    customerName:string,
    company:string,
    phone:string,
    address:string,
    mail:string
}
// 删除客户信息
export interface DeleteCustomerInfo{
    token:any,
    customerId:number
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
    // 展示所有客户信息
    token:GetCustomerData={
        token:localStorage.getItem('token')
    }
    // 通过userName查询userId
    getCustomerId:GetCustomerId={
        token:localStorage.getItem('token'),
        customerName:''
    }
    // 删除工作人员信息
    deleteCustomerInfo:DeleteCustomerInfo={
        token:localStorage.getItem('token'),
        customerId:1
    }
    // 添加工作人员信息
    getNewCustomer:GetNewCustomer={
        token:localStorage.getItem('token'),
        customerId:1.0,
        customerName:'',
        company:'',
        phone:'',
        address:'',
        mail:''
    }
    // 修改客户信息
    getUpdateCustomer:GetUpdateCustomer={
        token:localStorage.getItem('token'),
        customerId:1.0,
        customerName:'',
        company:'',
        phone:'',
        address:'',
        mail:''
    }
    list:ListInt[]=[]//展示的内容数据
    
    updateIsShow=false
    insertIsShow=false
}