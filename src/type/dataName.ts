export interface ListInt{
    DATANAMEID:number,
    DATANAMENAME:string,
}
// 展示数据名称列表
export interface GetDataNameData{
    token:any
}
// 通过DataNameName获取DataNameId
export interface GetDataNameId{
    token:any,
    dataNameName:string
}
// 新增数据名称信息
export interface GetNewDataName{
    token:any,
    dataNameId:number,
    dataNameName:string,
}
// 修改数据名称信息
export interface GetUpdateDataName{
    token:any,
    dataNameId:number,
    dataNameName:string,
}
// 删除数据名称信息
export interface DeleteDataNameInfo{
    token:any,
    dataNameId:number
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
    // 展示所有数据名称信息
    token:GetDataNameData={
        token:localStorage.getItem('token')
    }
    // 通过DataNameName查询DataNameId
    getDataNameId:GetDataNameId={
        token:localStorage.getItem('token'),
        dataNameName:''
    }
    // 删除数据名称信息
    deleteDataNameInfo:DeleteDataNameInfo={
        token:localStorage.getItem('token'),
        dataNameId:1
    }
    // 添加数据名称信息
    getNewDataName:GetNewDataName={
        token:localStorage.getItem('token'),
        dataNameId:1.0,
        dataNameName:'',
    }
    // 修改数据名称信息
    getUpdateDataName:GetUpdateDataName={
        token:localStorage.getItem('token'),
        dataNameId:1.0,
        dataNameName:''
    }
    list:ListInt[]=[]//展示的内容数据
    
    updateIsShow=false
    insertIsShow=false
}