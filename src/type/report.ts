export interface ListInt{
    REPORTID:number,
    REPORTNAME:string,
    ENTRUSTMENTNAME:string,
    USERNAME:string,
    STBATCH1:string,
    STMODE:string,
    STNUM:number,
    LEVELNAME:string,
    TESTRANK1:string,
    TESTDATA1:string,
    DATANAMENAME:string,
    EQUIPMENTNAME:string,
    TESTTIME:string,
    TESTPLACE:string,
    REPORTFILE:string,
    REMARK:string,
    STATUS:string,
    token:any,
    resultName:string,
    templateName:string,
    dataNameName:string,
    testRank:string,
    testData:string,
    testTime:string,
    testPlace:string,
    sampleNumber:number,
    equipmentName:string,
    remark:string,
    status:string,
    reportFile:string,
}
// 展示工作人员列表
export interface UserListInt{
    USERID:number,
    USERNAME:string,
}
// 展示检测结果
export interface ResultListInt{
    RESULTID:number,
    RESULTNAME:string,
    TESTRANK1:string,
    TESTDATA1:string
}
// 展示样品标签模板
export interface TemplateListInt{
    TEMPLATEID:number,
    TEMPLATENAME:string,
    STBATCH1:string,
    STMODE:string,
    STNUM:number
}
// 展示样品档次
export interface LevelListInt{
    lEVELID:number,
    LEVELNAME:string,
}
// 展示检测数据名称
export interface DataNameListInt{
    DATANAMEID:number,
    DATANAMENAME:string,
}
// 展示设备列表
export interface EquipmentListInt{
    EQUIPMENTID:number,
    EQUIPMENTNAME:string,
}
// 展示委托单
export interface EntrustmentListInt{
    ENTRUSTMENTID:number,
    ENTRUSTMENTNAME:string,
}



// 获取工作人员信息
export interface GetUserData{
    token:any
}
// 通过userName获取userId
export interface GetUserId{
    token:any,
    userName:string
}
// 获取检测结果
export interface GetResultData{
    token:any
}
// 通过resultName获取resultId
export interface GetResultId{
    token:any,
    resultName:string
}
// 获取样品标签模板
export interface GetTemplateData{
    token:any
}
// 通过templateName获取templateId
export interface GetTemplateId{
    token:any,
    templateName:string
}
// 获取样品档次
export interface GetLevelData{
    token:any
}
// 通过levelName获取levelId
export interface GetLevelId{
    token:any,
    levelName:string
}
// 获取检测数据名称
export interface GetDataNameData{
    token:any
}
// 通过dataNameName获取dataNameId
export interface GetDataNameId{
    token:any,
    dataNameName:string
}
// 获取设备名称
export interface GetEquipmentData{
    token:any
}
// 通过equipmentName获取equipmentId
export interface GetEquipmentId{
    token:any,
    equipmentName:string
}
// 获取委托单
export interface GetEntrustmentData{
    token:any
}
// 通过entrustmentName获取entrustmentId
export interface GetEntrustmentId{
    token:any,
    entrustmentName:string
}



// 展示报告列表
export interface GetReportData{
    token:any
}
// 通过reportName获取reportId
export interface GetReportId{
    token:any,
    reportName:string
}
// 新增报告信息
export interface GetNewReport{
    token:any,
    reportId:number,
    reportName:string,
    userName:string,
    resultName:string,
    templateName:string,
    stModel:string,
    stBatch:string,
    stNum:number,
    levelName:string,
    dataNameName:string,
    testRank:string,
    testData:string,
    testTime:string,
    testPlace:string,
    sampleNumber:number,
    equipmentName:string,
    remark:string,
    entrustmentName:string,
    status:string,
    reportFile:string,
}
// 修改报告信息
export interface GetUpdateReport{
    token:any,
    reportId:number,
    reportName:string,
    userName:string,
    resultName:string,
    templateName:string,
    stModel:string,
    stBatch:string,
    stNum:number,
    levelName:string,
    dataNameName:string,
    testRank:string,
    testData:string,
    testTime:string,
    testPlace:string,
    sampleNumber:number,
    equipmentName:string,
    remark:string,
    entrustmentName:string,
    status:string,
    reportFile:string,
}
// 删除报告信息
export interface DeleteReportInfo{
    token:any,
    reportId:number
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
    // 展示所有报告信息
    token:GetReportData={
        token:localStorage.getItem('token')
    }
    // 通过reportName查询reportId
    getReportId:GetReportId={
        token:localStorage.getItem('token'),
        reportName:''
    }
    // 删除报告信息
    deleteReportInfo:DeleteReportInfo={
        token:localStorage.getItem('token'),
        reportId:1
    }
    // 添加报告信息
    getNewReport:GetNewReport={
        token:localStorage.getItem('token'),
        reportId:1,
        reportName:'',
        userName:'',
        resultName:'',
        templateName:'',
        stModel:'',
        stBatch:'',
        stNum:0,
        levelName:'',
        dataNameName:'',
        testRank:'',
        testData:'',
        testTime:'',
        testPlace:'',
        sampleNumber:0,
        equipmentName:'',
        remark:'',
        entrustmentName:'',
        status:'',
        reportFile:'',
    }
    // 修改报告信息
    getUpdateReport:GetUpdateReport={
        token:localStorage.getItem('token'),
        reportId:1,
        reportName:'',
        userName:'',
        resultName:'',
        templateName:'',
        stModel:'',
        stBatch:'',
        stNum:0,
        levelName:'',
        dataNameName:'',
        testRank:'',
        testData:'',
        testTime:'',
        testPlace:'',
        sampleNumber:0,
        equipmentName:'',
        remark:'',
        entrustmentName:'',
        status:'',
        reportFile:'',
    }
    list:ListInt[]=[]//展示的内容数据

    user:UserListInt[]=[]
    result:ResultListInt[]=[]
    template:TemplateListInt[]=[]
    level:LevelListInt[]=[]
    dataName:DataNameListInt[]=[]
    equipment:EquipmentListInt[]=[]
    entrustment:EntrustmentListInt[]=[]

    userToken:GetUserData={
        token:localStorage.getItem('token')
    }
    // 通过userName获取userId 
    getUserId:GetUserId={
        token:localStorage.getItem('token'),
        userName:''
    }

    resultToken:GetResultData={
        token:localStorage.getItem('token')
    }
    // 通过resultName获取resultId 
    getResultId:GetResultId={
        token:localStorage.getItem('token'),
        resultName:''
    }

    templateToken:GetTemplateData={
        token:localStorage.getItem('token')
    }
    // 通过templateName获取templateId 
    getTemplateId:GetTemplateId={
        token:localStorage.getItem('token'),
        templateName:''
    }

    levelToken:GetLevelData={
        token:localStorage.getItem('token')
    }
    // 通过levelName获取levelId 
    getLevelId:GetLevelId={
        token:localStorage.getItem('token'),
        levelName:''
    }

    dataNameToken:GetDataNameData={
        token:localStorage.getItem('token')
    }
    // 通过dataNameName获取dataNameId 
    getDataNameId:GetDataNameId={
        token:localStorage.getItem('token'),
        dataNameName:''
    }

    equipmentToken:GetEquipmentData={
        token:localStorage.getItem('token')
    }
    // 通过equipmentName获取equipmentId 
    getEquipmentId:GetEquipmentId={
        token:localStorage.getItem('token'),
        equipmentName:''
    }

    entrustmentToken:GetEntrustmentData={
        token:localStorage.getItem('token')
    }
    // 通过entrustmentName获取entrustmentId 
    getEntrustmentId:GetEntrustmentId={
        token:localStorage.getItem('token'),
        entrustmentName:''
    }
    
    updateIsShow=false
    insertIsShow=false
}