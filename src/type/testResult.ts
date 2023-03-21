export interface ListInt{
    RESULTID:number,
    RESULTNAME:string,
    CIRCULATIONNAME:string,
    TESTRANK:string,
    TESTDATA:string,
    DATANAMENAME:string,
    TESTFIRST:number,
    TESTCYCLE:number
}
// 展示检测数据名称
export interface DataNameListInt{
    DATANAMEID:number,
    DATANAMENAME:string,
}
// 展示任务单
export interface CirculationListInt{
    CIRCULATIONID:number,
    CIRCULATIONNAME:string,
}

// 展示检测数据名称
export interface GetDataNameData{
    token:any
}
// 通过dataNameName获取dataNameId
export interface GetDataNameId{
    token:any,
    dataNameName:string
}

// 展示任务单
export interface GetCirculationData{
    token:any
}
// 通过circulationName获取circulationId
export interface GetCirculationId{
    token:any,
    circulationName:string
}



// 展示检测结果列表
export interface GetResultData{
    token:any
}
// 通过resultname获取resultid
export interface GetResultId{
    token:any,
    resultName:string
}
// 新增检测结果信息
export interface GetNewResult{
    token:any,
    resultId:number,
    resultName:string,
    testRank:string,
    dataNameName:string,
    testData:string,
    testFirst:number,
    testCycle:number,
    circulationName:string,
}
// 修改检测结果信息
export interface GetUpdateResult{
    token:any,
    resultId:number,
    resultName:string,
    testRank:string,
    dataNameName:string,
    testData:string,
    testFirst:number,
    testCycle:number,
    circulationName:string,
}
// 删除检测结果
export interface DeleteResultInfo{
    token:any,
    resultId:number
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
    // 展示所有检测结果
    token:GetResultData={
        token:localStorage.getItem('token')
    }
    // 通过ResultName查询ResultId
    getResultId:GetResultId={
        token:localStorage.getItem('token'),
        resultName:''
    }
    // 删除检测结果
    deleteResultInfo:DeleteResultInfo={
        token:localStorage.getItem('token'),
        resultId:1
    }
    // 添加检测结果
    getNewResult:GetNewResult={
        token:localStorage.getItem('token'),
        resultId:1,
        resultName:'',
        testRank:'',
        dataNameName:'',
        testData:'',
        testFirst:1,
        testCycle:1,
        circulationName:'',
    }
    // 修改检测结果
    getUpdateResult:GetUpdateResult={
        token:localStorage.getItem('token'),
        resultId:1,
        resultName:'',
        testRank:'',
        dataNameName:'',
        testData:'',
        testFirst:1,
        testCycle:1,
        circulationName:'',
    }
    list:ListInt[]=[]//展示的内容数据

    dataName:DataNameListInt[]=[]
    circulation:CirculationListInt[]=[]

    dataNameToken:GetDataNameData={
        token:localStorage.getItem('token')
    }
    // 通过dataNameName获取dataNameId 
    getDataNameId:GetDataNameId={
        token:localStorage.getItem('token'),
        dataNameName:''
    }

    circulationToken:GetCirculationData={
        token:localStorage.getItem('token')
    }
    // 通过circulationName获取circulationId 
    getCirculationId:GetCirculationId={
        token:localStorage.getItem('token'),
        circulationName:''
    }
    
    updateIsShow=false
    insertIsShow=false
}