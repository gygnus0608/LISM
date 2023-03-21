export interface ListInt{
    REPORTID:number,
    REPORTNAME:string,
    CIRCULATIONNAME:string,
    ENTRUSTMENTNAME:string,
    RESULTNAME:string,
    USERNAME1:string,
    SAMPLENAME:string,
    STBATCH:string,
    STMODE:string,
    STNUM:number,
    TESTRANK:string,
    DATANAMENAME:string,
    TESTDATA:string,
    EQUIPMENTNAME:string,
    FILEPATH:string,
    TESTTIME:string,
    TESTPLACE:string,
    REMARK:any,
    STATUS:string,
    FILENAME:string,
}
// 展示员工信息
export interface UserListInt{
    USERID:number,
    USERNAME:string,
}
// 展示检测结果
export interface ResultListInt{
    RESULTID:number,
    RESULTNAME:string,
    TESTRANK:string,
    TESTDATA:string,
}
// 展示样品
export interface SampleListInt{
    SAMPLEID:number,
    SAMPLENAME:string,
    STBATCH:string,
    STMODE:string,
    STNUM:number
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
// 展示任务单
export interface CirculationListInt{
    CIRCULATIONID:number,
    CIRCULATIONNAME:string,
}
// 展示文件
export interface FileListInt{
    FILEID:number,
    FILENAME:string,
}


// 获取员工信息
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

// 获取样品
export interface GetSampleData{
    token:any
}
// 通过sampleName获取sampleId
export interface GetSampleId{
    token:any,
    sampleName:string
}

// 获取检测数据
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

// 获取任务单
export interface GetCirculationData{
    token:any
}
// 通过CirculationName获取CirculationId
export interface GetCirculationId{
    token:any,
    circulationName:string
}

// 获取文件
export interface GetFileData{
    token:any
}
// 通过fileName获取fileId
export interface GetFileId{
    token:any,
    fileName:string
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
    resultName:string,
    sampleName:string,
    equipmentName:string,
    entrustmentName:string,
    testTime:string,
    testPlace:string,
    remark:string,
    status:string,
    fileName:string
}
// 修改报告信息
export interface GetUpdateReport{
    token:any,
    reportId:number,
    reportName:string,
    resultName:string,
    sampleName:string,
    equipmentName:string,
    entrustmentName:string,
    testTime:string,
    testPlace:string,
    remark:string,
    status:string,
    fileName:string
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
        resultName:'',
        sampleName:'',
        equipmentName:'',
        entrustmentName:'',
        testTime:'',
        testPlace:'',
        remark:'',
        status:'',
        fileName:''
    }
    // 修改报告信息
    getUpdateReport:GetUpdateReport={
        token:localStorage.getItem('token'),
        reportId:1,
        reportName:'',
        resultName:'',
        sampleName:'',
        equipmentName:'',
        entrustmentName:'',
        testTime:'',
        testPlace:'',
        remark:'',
        status:'',
        fileName:''
    }
    list:ListInt[]=[]//展示的内容数据

    user:UserListInt[]=[]
    result:ResultListInt[]=[]
    sample:SampleListInt[]=[]
    dataName:DataNameListInt[]=[]
    equipment:EquipmentListInt[]=[]
    entrustment:EntrustmentListInt[]=[]
    circulation:CirculationListInt[]=[]
    file:FileListInt[]=[]

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

    sampleToken:GetSampleData={
        token:localStorage.getItem('token')
    }
    // 通过sampleName获取sampleId 
    getSampleId:GetSampleId={
        token:localStorage.getItem('token'),
        sampleName:''
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
    // 通过EntrustmentName获取EntrustmentId 
    getEntrustmentId:GetEntrustmentId={
        token:localStorage.getItem('token'),
        entrustmentName:''
    }

    circulationToken:GetCirculationData={
        token:localStorage.getItem('token')
    }
    // 通过CirculationName获取CirculationId 
    getCirculationId:GetCirculationId={
        token:localStorage.getItem('token'),
        circulationName:''
    }

    fileToken:GetFileData={
        token:localStorage.getItem('token')
    }
    // 通过fileName获取fileId 
    getFileId:GetFileId={
        token:localStorage.getItem('token'),
        fileName:''
    }
    
    updateIsShow=false
    insertIsShow=false
}