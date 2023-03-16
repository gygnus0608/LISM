export interface ListInt{
    SUPPLIERID:number,
    SUPPLIERNAME:string,
    COMPANY:string,
    PHONE:string,
    ADDRESS:string,
    MAIL:string,
}
// 展示供应商列表
export interface GetSupplierData{
    token:any
}
// 通过supplierName获取supplierId
export interface GetSupplierId{
    token:any,
    supplierName:string
}
// 新增供应商信息
export interface GetNewSupplier{
    token:any,
    supplierId:number,
    supplierName:string,
    company:string,
    phone:string,
    address:string,
    mail:string
}
// 修改供应商信息
export interface GetUpdateSupplier{
    token:any,
    supplierId:number,
    supplierName:string,
    company:string,
    phone:string,
    address:string,
    mail:string
}
// 删除供应商信息
export interface DeleteSupplierInfo{
    token:any,
    supplierId:number
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
    // 展示所有供应商信息
    token:GetSupplierData={
        token:localStorage.getItem('token')
    }
    // 通过supplierName查询supplierId
    getSupplierId:GetSupplierId={
        token:localStorage.getItem('token'),
        supplierName:''
    }
    // 删除供应商信息
    deleteSupplierInfo:DeleteSupplierInfo={
        token:localStorage.getItem('token'),
        supplierId:1
    }
    // 添加供应商信息
    getNewSupplier:GetNewSupplier={
        token:localStorage.getItem('token'),
        supplierId:1.0,
        supplierName:'',
        company:'',
        phone:'',
        address:'',
        mail:''
    }
    // 修改供应商信息
    getUpdateSupplier:GetUpdateSupplier={
        token:localStorage.getItem('token'),
        supplierId:1.0,
        supplierName:'',
        company:'',
        phone:'',
        address:'',
        mail:''
    }
    list:ListInt[]=[]//展示的内容数据
    
    updateIsShow=false
    insertIsShow=false
}