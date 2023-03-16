export interface ListInt{
    CONTRACTID:number,
    CONTRACTNAME:string,
}
// 展示测试协议列表
export interface GetContractData{
    token:any
}
// 通过ContractName获取ContractId
export interface GetContractId{
    token:any,
    contractName:string
}
// 新增测试协议信息
export interface GetNewContract{
    token:any,
    contractId:number,
    contractName:string,
}
// 修改测试协议信息
export interface GetUpdateContract{
    token:any,
    contractId:number,
    contractName:string,
}
// 删除测试协议信息
export interface DeleteContractInfo{
    token:any,
    contractId:number
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
    // 展示所有测试协议信息
    token:GetContractData={
        token:localStorage.getItem('token')
    }
    // 通过ContractName查询ContractId
    getContractId:GetContractId={
        token:localStorage.getItem('token'),
        contractName:''
    }
    // 删除测试协议信息
    deleteContractInfo:DeleteContractInfo={
        token:localStorage.getItem('token'),
        contractId:1
    }
    // 添加测试协议信息
    getNewContract:GetNewContract={
        token:localStorage.getItem('token'),
        contractId:1.0,
        contractName:'',
    }
    // 修改测试协议信息
    getUpdateContract:GetUpdateContract={
        token:localStorage.getItem('token'),
        contractId:1.0,
        contractName:''
    }
    list:ListInt[]=[]//展示的内容数据
    
    updateIsShow=false
    insertIsShow=false
}