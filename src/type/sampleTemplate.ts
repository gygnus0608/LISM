export interface ListInt{
    TEMPLATEID:number,
    TEMPLATENAME:string,
    LEVELNAME:string,
    STBATCH:string,
    STMODE:string,
    STNUM:number,
    RECEIVENUM:number,
    DISTRIBUTENUM:number
}
// 展示样品档次列表
export interface LevelListInt{
    LEVELID:number,
    LEVELNAME:string,
    
}
export interface GetLevelData{
    token:any
}
// 通过levelName获取levelId
export interface GetLevelId{
    token:any,
    levelName:string
}
// 展示样品标签列表
export interface GetSampleTemplateData{
    token:any
}
// 通过sampleTemplateName获取sampleTemplateId
export interface GetSampleTemplateId{
    token:any,
    templateName:string
}
// 新增样品模板信息
export interface GetNewSampleTemplate{
    token:any,
    templateId:number,
    templateName:string,
    levelName:string,
    stBatch:string,
    stMode:string,
    stNum:number,
    receiveNum:number,
    distributeNum:number
}
// 修改样品模板信息
export interface GetUpdateSampleTemplate{
    token:any,
    templateId:number,
    templateName:string,
    levelName:string,
    stBatch:string,
    stMode:string,
    stNum:number,
    receiveNum:number,
    distributeNum:number
}
// 删除样品模板信息
export interface DeleteSampleTemplateInfo{
    token:any,
    templateId:number
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
    // 展示所有样品模板信息
    token:GetSampleTemplateData={
        token:localStorage.getItem('token')
    }
    // 通过SampleTemplateName查询SampleTemplateId
    getSampleTemplateId:GetSampleTemplateId={
        token:localStorage.getItem('token'),
        templateName:''
    }
    // 删除样品模板信息
    deleteSampleTemplateInfo:DeleteSampleTemplateInfo={
        token:localStorage.getItem('token'),
        templateId:1
    }
    // 添加样品模板信息
    getNewSampleTemplate:GetNewSampleTemplate={
        token:localStorage.getItem('token'),
        templateId:1,
        templateName:'',
        levelName:'',
        stBatch:'',
        stMode:'',
        stNum:1,
        receiveNum:1,
        distributeNum:1
    }
    // 修改样品模板信息
    getUpdateSampleTemplate:GetUpdateSampleTemplate={
        token:localStorage.getItem('token'),
        templateId:1,
        templateName:'',
        levelName:'',
        stBatch:'',
        stMode:'',
        stNum:1,
        receiveNum:1,
        distributeNum:1
    }
    list:ListInt[]=[]//展示的内容数据

    level:LevelListInt[]=[]

    levelToken:GetLevelData={
        token:localStorage.getItem('token')
    }
    // 通过levelName获取levelId 
    getLevelId:GetLevelId={
        token:localStorage.getItem('token'),
        levelName:''
    }
    updateIsShow=false
    insertIsShow=false
}