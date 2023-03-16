export interface ListInt{
    TYPEID:number,
    TYPENAME:string,
}
// 展示项目类型列表
export interface GetTypeData{
    token:any
}
// 通过TypeName获取TypeId
export interface GetTypeId{
    token:any,
    typeName:string
}
// 新增项目类型信息
export interface GetNewType{
    token:any,
    typeId:number,
    typeName:string,
}
// 修改项目类型信息
export interface GetUpdateType{
    token:any,
    typeId:number,
    typeName:string,
}
// 删除项目类型信息
export interface DeleteTypeInfo{
    token:any,
    typeId:number
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
    // 展示所有项目类型信息
    token:GetTypeData={
        token:localStorage.getItem('token')
    }
    // 通过TypeName查询TypeId
    getTypeId:GetTypeId={
        token:localStorage.getItem('token'),
        typeName:''
    }
    // 删除项目类型信息
    deleteTypeInfo:DeleteTypeInfo={
        token:localStorage.getItem('token'),
        typeId:1
    }
    // 添加项目类型信息
    getNewType:GetNewType={
        token:localStorage.getItem('token'),
        typeId:1.0,
        typeName:'',
    }
    // 修改项目类型信息
    getUpdateType:GetUpdateType={
        token:localStorage.getItem('token'),
        typeId:1.0,
        typeName:''
    }
    list:ListInt[]=[]//展示的内容数据
    
    updateIsShow=false
    insertIsShow=false
}