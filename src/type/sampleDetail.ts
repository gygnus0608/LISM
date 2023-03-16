export interface ListInt{
    DETAILID:number,
    DETAILNAME:string,
}
// 展示样品处理方式列表
export interface GetDetailData{
    token:any
}
// 通过DetailName获取DetailId
export interface GetDetailId{
    token:any,
    detailName:string
}
// 新增样品处理方式信息
export interface GetNewDetail{
    token:any,
    detailId:number,
    detailName:string,
}
// 修改样品处理方式信息
export interface GetUpdateDetail{
    token:any,
    detailId:number,
    detailName:string,
}
// 删除样品处理方式信息
export interface DeleteDetailInfo{
    token:any,
    detailId:number
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
    // 展示所有样品处理方式信息
    token:GetDetailData={
        token:localStorage.getItem('token')
    }
    // 通过DetailName查询DetailId
    getDetailId:GetDetailId={
        token:localStorage.getItem('token'),
        detailName:''
    }
    // 删除样品处理方式信息
    deleteDetailInfo:DeleteDetailInfo={
        token:localStorage.getItem('token'),
        detailId:1
    }
    // 添加样品处理方式信息
    getNewDetail:GetNewDetail={
        token:localStorage.getItem('token'),
        detailId:1.0,
        detailName:'',
    }
    // 修改样品处理方式信息
    getUpdateDetail:GetUpdateDetail={
        token:localStorage.getItem('token'),
        detailId:1.0,
        detailName:''
    }
    list:ListInt[]=[]//展示的内容数据
    
    updateIsShow=false
    insertIsShow=false
}