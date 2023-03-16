export interface ListInt{
    CIRCULATIONID:number,
    CIRCULATIONNAME:string,
    ENTRUSTMENTNAME:string,
    ORDERTESTNAME:string,
    SAMPLENAME:string,
    NODENAME:string,
    NODENAME1:string,
    USERNAME:string,
    USERNAME1:string,
    ASSIGNDATE:string,
    CONFIRMIT:number,
    STBATCH:string,
    STMODE:string,
    STNUM:number
}
// 展示委托单列表
export interface EntrustmentListInt{
    ENTRUSTMENTID:number,
    ENTRUSTMENTNAME:string,
}
// 展示流转节点列表
export interface NodeListInt{
    NODEID:number,
    NODENAME:string,
}
// 展示工作人员列表
export interface UserListInt{
    USERID:number,
    USERNAME:string,
}
// 展示委托单下属项目列表
export interface OrderTestListInt{
    ORDERTESTID:number,
    ORDERTESTNAME:string,
}
// 展示样品信息
export interface SampleListInt{
    SAMPLETID:number,
    SAMPLENAME:string,
    STBATCH:string,
    STMODE:string,
    STNUM:number
}


export interface GetEntrustmentData{
    token:any
}
// 通过EntrustmentName获取EntrustmentId
export interface GetEntrustmentId{
    token:any,
    entrustmentName:string
}

export interface GetNodeData{
    token:any
}
// 通过nodeName获取nodeId
export interface GetNodeId{
    token:any,
    nodeName:string
}

export interface GetUserData{
    token:any
}
// 通过userName获取userId
export interface GetUserId{
    token:any,
    userName:string
}

export interface GetOrderTestData{
    token:any
}
// 通过orderTestName获取orderTestId
export interface GetOrderTestId{
    token:any,
    orderTestName:string
}

export interface GetSampleData{
    token:any
}
// 通过sampleName获取sampleId
export interface GetSampleId{
    token:any,
    sampleName:string
}


// 展示任务单列表
export interface GetCirculationData{
    token:any
}
// 通过circulationName获取circulationId
export interface GetCirculationId{
    token:any,
    circulationName:string
}
// 新增任务流转单
export interface GetNewCirculation{
    token:any,
    circulationId:number,
    circulationName:string,
    entrustmentName:string,
    orderTestName:string,
    sampleName:string,
    nextNodeName:string,
    lastNodeName:string,
    nextUserName:string,
    lastUserName:string,
    assignDate:string,
    confirmIt:number
}
// 修改任务流转单
export interface GetUpdateCirculation{
    token:any,
    circulationId:number,
    circulationName:string,
    entrustmentName:string,
    orderTestName:string,
    sampleName:string,
    nextNodeName:string,
    lastNodeName:string,
    nextUserName:string,
    lastUserName:string,
    assignDate:string,
    confirmIt:number
}
// 删除任务流转单
export interface DeleteCirculationInfo{
    token:any,
    circulationId:number
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
    // 展示所有任务流转单
    token:GetCirculationData={
        token:localStorage.getItem('token')
    }
    // 通过circulationName查询circulationId
    getCirculationId:GetCirculationId={
        token:localStorage.getItem('token'),
        circulationName:''
    }
    // 删除任务流转单
    deleteCirculationInfo:DeleteCirculationInfo={
        token:localStorage.getItem('token'),
        circulationId:1
    }
    // 添加任务流转单
    getNewCirculation:GetNewCirculation={
        token:localStorage.getItem('token'),
        circulationId:0,
        circulationName:'',
        entrustmentName:'',
        orderTestName:'',
        sampleName:'',
        nextNodeName:'',
        lastNodeName:'',
        nextUserName:'',
        lastUserName:'',
        assignDate:'',
        confirmIt:0
    }
    // 修改任务流转单
    getUpdateCirculation:GetUpdateCirculation={
        token:localStorage.getItem('token'),
        circulationId:0,
        circulationName:'',
        entrustmentName:'',
        orderTestName:'',
        sampleName:'',
        nextNodeName:'',
        lastNodeName:'',
        nextUserName:'',
        lastUserName:'',
        assignDate:'',
        confirmIt:0
    }
    list:ListInt[]=[]//展示的内容数据

    entrustment:EntrustmentListInt[]=[]
    node:NodeListInt[]=[]
    user:UserListInt[]=[]
    orderTestItem:OrderTestListInt[]=[]
    sample:SampleListInt[]=[]

    entrustmentToken:GetEntrustmentData={
        token:localStorage.getItem('token')
    }
    // 通过departmentName获取departmentId 
    getEntrustmentId:GetEntrustmentId={
        token:localStorage.getItem('token'),
        entrustmentName:''
    }
    nodeToken:GetNodeData={
        token:localStorage.getItem('token')
    }
    // 通过nodeName获取nodeId 
    getNodeId:GetNodeId={
        token:localStorage.getItem('token'),
        nodeName:''
    }
    userToken:GetUserData={
        token:localStorage.getItem('token')
    }
    // 通过userName获取userId 
    getUserId:GetUserId={
        token:localStorage.getItem('token'),
        userName:''
    }
    orderTestToken:GetOrderTestData={
        token:localStorage.getItem('token')
    }
    // 通过orderTestName获取orderTestId 
    getOrderTestId:GetOrderTestId={
        token:localStorage.getItem('token'),
        orderTestName:''
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
}