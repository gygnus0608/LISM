export interface ListInt{
    ORDERTESTID:number,
    ORDERTESTNAME:string,
    ENTRUSTMENTID:number,
    ENTRUSTMENTNAME:string,
    ORDERMAX:number,
    ORDERMIN:number,
    ORDERSTANDARD:number,
    ORDERSTANDARDHOUR:number,
    ORDERREMIND:number,
    ORDERMETHOD:string,
    ORDERREQUIRE:string,
    SAMPLENAME:string,
    SAMPLENUM:number
}
// 展示委托单列表
export interface EntrustmentListInt{
    ENTRUSTMENTID:number,
    ENTRUSTMENTNAME:string,
}
// 展示样品列表
export interface SampleListInt{
    SAMPLEID:number,
    SAMPLENAME:string,
    SAMPLENUM:number
}
// 展示委托单列表
export interface Entrustment1ListInt{
    ENTRUSTMENTID:number,
    ENTRUSTMENTNAME:string,
    DEPARTMENTNAME:string,
    ENTRUSTMENTNUM:number,
    SENDDATE:string,
    SENDNUM:number,
    GOAL:string,
    DETAILNAME:string
    REPORTNAME:string,
    TYPENAME:string
    USERNAME:string
    PHONE1:string
    MAIL1:string
    CONTRACTNAME:string
    ENTRUSTMARK:string
    REPORTFINAL:string
    STATUSX:string
    STATUSY:string
}


// 展示选择的委托单
export interface GetSelectEntrustmentData{
    token:any,
    entrustmentId:number
}
// 展示委托单列表
export interface GetEntrustmentData{
    token:any,
}
// 通过EntrustmentName获取EntrustmentId
export interface GetEntrustmentId{
    token:any,
    entrustmentName:string
}

// 展示样品列表
export interface GetSampleData{
    token:any
}
// 通过sampleName获取sampleId
export interface GetSampleId{
    token:any,
    sampleName:string
}

// 展示委托单下属项目列表
export interface GetOrderTestItemData{
    token:any
}
// 通过OrderTestName获取OrderTestId
export interface GetOrderTestItemId{
    token:any,
    orderTestName:string
}
// 新增委托单下属项目信息
export interface GetNewOrderTestItem{
    token:any,
    orderTestId:number,
    orderTestName:string,
    entrustmentName:string,
    orderMax:number,
    orderMin:number,
    orderStandard:number,
    orderStandardHour:number,
    orderRemind:number,
    orderMethod:string,
    orderRequire:string,
    sampleName:string,
    sampleNum:number
}
// 修改委托单下属项目信息
export interface GetUpdateOrderTestItem{
    token:any,
    orderTestId:number,
    orderTestName:string,
    entrustmentName:string,
    orderMax:number,
    orderMin:number,
    orderStandard:number,
    orderStandardHour:number,
    orderRemind:number,
    orderMethod:string,
    orderRequire:string,
    sampleName:string,
    sampleNum:number
}
// 删除委托单下属项目信息
export interface DeleteOrderTestItemInfo{
    token:any,
    orderTestId:number
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
    // 展示所有委托单下属项目信息
    token:GetOrderTestItemData={
        token:localStorage.getItem('token')
    }
    // 通过orderTestName查询orderTestId
    getOrderTestItemId:GetOrderTestItemId={
        token:localStorage.getItem('token'),
        orderTestName:''
    }
    // 删除委托单下属项目信息
    deleteOrderTestItemInfo:DeleteOrderTestItemInfo={
        token:localStorage.getItem('token'),
        orderTestId:1
    }
    // 添加委托单下属项目信息
    getNewOrderTestItem:GetNewOrderTestItem={
        token:localStorage.getItem('token'),
        orderTestId:1,
        orderTestName:'',
        entrustmentName:'',
        orderMax:0,
        orderMin:0,
        orderStandard:0,
        orderStandardHour:0,
        orderRemind:0,
        orderMethod:'',
        orderRequire:'',
        sampleName:'',
        sampleNum:0
    }
    // 修改委托单下属项目信息
    getUpdateOrderTestItem:GetUpdateOrderTestItem={
        token:localStorage.getItem('token'),
        orderTestId:1,
        orderTestName:'',
        entrustmentName:'',
        orderMax:0,
        orderMin:0,
        orderStandard:0,
        orderStandardHour:0,
        orderRemind:0,
        orderMethod:'',
        orderRequire:'',
        sampleName:'',
        sampleNum:0
    }
    list:ListInt[]=[]//展示的内容数据

    entrustment:EntrustmentListInt[]=[]

    entrustment1:Entrustment1ListInt[]=[]

    sample:SampleListInt[]=[]

    entrustmentToken:GetEntrustmentData={
        token:localStorage.getItem('token'),
    }
    // 查询选择的委托单信息
    entrustmentInfo:GetSelectEntrustmentData={
        token:localStorage.getItem('token'),
        entrustmentId:1
    }
    // 通过entrustmentName获取entrustmentId 
    getEntrustmentId:GetEntrustmentId={
        token:localStorage.getItem('token'),
        entrustmentName:''
    }

    sampleToken:GetSampleData={
        token:localStorage.getItem('token')
    }
    // 通过sampleName获取sampleId 
    getSampleId:GetSampleId={
        token:localStorage.getItem('token'),
        sampleName:''
    }
    
    updateIsShow=false
    insertIsShow=false
    checkIsShow=false
}