export interface ListInt{
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
// 展示部门列表
export interface DepartmentListInt{
    USERID:number,
    DEPARTMENTID:number,
    DEPARTMENTNAME:string,
}
// 展示样品处理方式
export interface SampleDetailListInt{
    DETAILID:number,
    DETAILNAME:string,
}
// 展示报告方式
export interface ReportMethodListInt{
    REPORTID:number,
    REPORTNAME:string,
}
// 展示检测类型
export interface TestTypeListInt{
    TYPEID:number,
    TYPENAME:string,
}
// 展示工作人员列表
export interface UserListInt{
    USERID:number,
    USERNAME:string,
    PHONE:string,
    MAIL:string,
}
// 展示测试协议
export interface ContractListInt{
    CONTRACTID:number,
    CONTRACTNAME:string,
}
// // 展示委托单下属项目
// export interface OrderTestItemListInt{
//     ORDERTESTID:number,
//     ORDERTESTNAME:string,
//     ENTRUSTMENTID:number,
//     ORDERMAX:number,
//     ORDERMIN:number,
//     ORDERSTANDARD:number,
//     ORDERSTANDARDHOUR:number,
//     ORDERREMIND:number,
//     ORDERMETHOD:string,
//     ORDERREQUIRE:string,
//     SAMPLENAME:string,
//     SAMPLENUM:number
// }
// // 展示所有委托单下属项目
// export interface GetOrderTestItemData{
//     token:any
// }

// 展示委托单信息
export interface GetEntrustmentData{
    token:any
}
// 展示部门信息
export interface GetDepartmentData{
    token:any
}
// 展示样品处理方式
export interface GetSampleDetailData{
    token:any
}
// 展示报告方式
export interface GetReportMethodData{
    token:any
}
// 展示检测类型
export interface GetTestTypeData{
    token:any
}
// 展示用户列表
export interface GetUserData{
    token:any
}
// 展示测试协议
export interface GetContractData{
    token:any
}
// // 展示选中的委托单下属项目
// export interface GetSelectOrderTestItemData{
//     token:any,
//     orderTestId:number
// }


// 通过entrustmentName获取entrustmentId
export interface GetEntrustmentId{
    token:any,
    entrustmentName:string
}
// 通过departmentName获取departmentId
export interface GetDepartmentId{
    token:any,
    departmentName:string
}
// 通过sampleDeatilName获取sampleDeatilId
export interface GetSampleDetailId{
    token:any,
    detailName:string
}
// 通过reportName获取reportId
export interface GetReportMethodId{
    token:any,
    reportName:string
}
// 通过typeName获取typeId
export interface GetTestTypeId{
    token:any,
    typeName:string
}
// 通过userName获取userId
export interface GetUserId{
    token:any,
    userName:string
}
// 通过contractName获取contractId
export interface GetContractId{
    token:any,
    contractName:string
}


// // 展示委托单列表
// export interface GetEntrustmentData{
//     token:any
// }
// // 通过entrustmentName获取entrustmentId
// export interface GetEntrustmentId{
//     token:any,
//     entrustmentName:string
// }
// 新增委托单信息
export interface GetNewEntrustment{
    token:any,
    entrustmentId:number,
    entrustmentName:string,
    departmentName:string,
    entrustmentNum:number,
    sendDate:string,
    sendNum:number,
    goal:string,
    detailName:string,
    reportName:string,
    typeName:string,
    userName:string
    phone:string
    mail:string
    contractName:string
    entrustMark:string
    reportFinal:string
    statusx:string
    statusy:string
}
// 修改委托单信息
export interface GetUpdateEntrustment{
    token:any,
    entrustmentId:number,
    entrustmentName:string,
    departmentName:string,
    entrustmentNum:number,
    sendDate:string,
    sendNum:number,
    goal:string,
    detailName:string,
    reportName:string,
    typeName:string,
    userName:string
    phone:string
    mail:string
    contractName:string
    entrustMark:string
    reportFinal:string
    statusx:string
    statusy:string
}
// 删除委托单信息
export interface DeleteEntrustmentInfo{
    token:any,
    entrustmentId:number
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
    // 展示所有委托单信息
    token:GetEntrustmentData={
        token:localStorage.getItem('token')
    }
    // 通过entrustmentName查询entrustmentId
    getEntrustmentId:GetEntrustmentId={
        token:localStorage.getItem('token'),
        entrustmentName:''
    }
    // 删除委托单信息
    deleteEntrustmentInfo:DeleteEntrustmentInfo={
        token:localStorage.getItem('token'),
        entrustmentId:1
    }
    // 添加委托单信息
    getNewEntrustment:GetNewEntrustment={
        token:localStorage.getItem('token'),
        entrustmentId:1,
        entrustmentName:'',
        departmentName:'',
        entrustmentNum:0,
        sendDate:'',
        sendNum:1,
        goal:'',
        detailName:'',
        reportName:'',
        typeName:'',
        userName:'',
        phone:'',
        mail:'',
        contractName:'',
        entrustMark:'',
        reportFinal:'',
        statusx:'',
        statusy:''
    }
    // 修改委托单信息
    getUpdateEntrustment:GetUpdateEntrustment={
        token:localStorage.getItem('token'),
        entrustmentId:1,
        entrustmentName:'',
        departmentName:'',
        entrustmentNum:0,
        sendDate:'',
        sendNum:0,
        goal:'',
        detailName:'',
        reportName:'',
        typeName:'',
        userName:'',
        phone:'',
        mail:'',
        contractName:'',
        entrustMark:'',
        reportFinal:'',
        statusx:'',
        statusy:''
    }
    // // 展示所有委托单下属项目
    // orderTestItemToken:GetOrderTestItemData={
    //     token:localStorage.getItem('token')
    // }
    // // 展示选择的委托单下属项目
    // selectOrderTestItem:GetSelectOrderTestItemData={
    //     token:localStorage.getItem('token'),
    //     orderTestId:1
    // }

    // 展示委托单下属项目
    // orderTestItem:OrderTestItemListInt[]=[]

    list:ListInt[]=[]//展示的内容数据

    department:DepartmentListInt[]=[]

    sampleDetail:SampleDetailListInt[]=[]

    reportMethod:ReportMethodListInt[]=[]

    testType:TestTypeListInt[]=[]

    user:UserListInt[]=[]

    contract:ContractListInt[]=[]

    // 部门
    departmentToken:GetDepartmentData={
        token:localStorage.getItem('token')
    }
    // 通过departmentName获取departmentId 
    getDepartmentId:GetDepartmentId={
        token:localStorage.getItem('token'),
        departmentName:''
    }

    // 样品处理
    detailToken:GetSampleDetailData={
        token:localStorage.getItem('token')
    }
    // 通过detailName获取detailId 
    getDetailId:GetSampleDetailId={
        token:localStorage.getItem('token'),
        detailName:''
    }

    // 报告方式
    reportMethodToken:GetReportMethodData={
        token:localStorage.getItem('token')
    }
    // 通过reportMethodName获取reportMethodId 
    getReportId:GetReportMethodId={
        token:localStorage.getItem('token'),
        reportName:''
    }

    // 检测类型
    testTypeToken:GetTestTypeData={
        token:localStorage.getItem('token')
    }
    // 通过testTypeName获取testTypeId 
    getTypeId:GetTestTypeId={
        token:localStorage.getItem('token'),
        typeName:''
    }

    // 用户列表
    userToken:GetUserData={
        token:localStorage.getItem('token')
    }
    // 通过userName获取userId 
    getUserId:GetUserId={
        token:localStorage.getItem('token'),
        userName:''
    }

    // 测试协议
    contractToken:GetContractData={
        token:localStorage.getItem('token')
    }
    // 通过contractName获取contractId 
    getContractId:GetContractId={
        token:localStorage.getItem('token'),
        contractName:''
    }
    
    updateIsShow=false
    insertIsShow=false
    // checkOrderShow=false
}