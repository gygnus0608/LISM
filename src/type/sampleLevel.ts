export interface ListInt{
    LEVELID:number,
    LEVELNAME:string,
}
// 展示样品档次列表
export interface GetLevelData{
    token:any
}
// 通过LevelName获取LevelId
export interface GetLevelId{
    token:any,
    levelName:string
}
// 新增样品档次信息
export interface GetNewLevel{
    token:any,
    levelId:number,
    levelName:string,
}
// 修改样品档次信息
export interface GetUpdateLevel{
    token:any,
    levelId:number,
    levelName:string,
}
// 删除样品档次信息
export interface DeleteLevelInfo{
    token:any,
    levelId:number
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
    // 展示所有样品档次信息
    token:GetLevelData={
        token:localStorage.getItem('token')
    }
    // 通过LevelName查询LevelId
    getLevelId:GetLevelId={
        token:localStorage.getItem('token'),
        levelName:''
    }
    // 删除样品档次信息
    deleteLevelInfo:DeleteLevelInfo={
        token:localStorage.getItem('token'),
        levelId:1
    }
    // 添加样品档次信息
    getNewLevel:GetNewLevel={
        token:localStorage.getItem('token'),
        levelId:1.0,
        levelName:'',
    }
    // 修改样品档次信息
    getUpdateLevel:GetUpdateLevel={
        token:localStorage.getItem('token'),
        levelId:1.0,
        levelName:''
    }
    list:ListInt[]=[]//展示的内容数据
    
    updateIsShow=false
    insertIsShow=false
}