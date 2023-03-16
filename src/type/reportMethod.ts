export interface ListInt{
    REPORTID:number,
    REPORTNAME:string,
}
// 展示报告方式列表
export interface GetReportMethodData{
    token:any
}
// 通过ReportName获取ReportId
export interface GetReportMethodId{
    token:any,
    reportName:string
}
// 新增报告方式信息
export interface GetNewReportMethod{
    token:any,
    reportId:number,
    reportName:string,
}
// 修改报告方式信息
export interface GetUpdateReportMethod{
    token:any,
    reportId:number,
    reportName:string,
}
// 删除报告方式信息
export interface DeleteReportMethodInfo{
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
    // 展示所有报告方式信息
    token:GetReportMethodData={
        token:localStorage.getItem('token')
    }
    // 通过ReportName查询ReportId
    getReportMethodId:GetReportMethodId={
        token:localStorage.getItem('token'),
        reportName:''
    }
    // 删除报告方式信息
    deleteReportMethodInfo:DeleteReportMethodInfo={
        token:localStorage.getItem('token'),
        reportId:1
    }
    // 添加报告方式信息
    getNewReportMethod:GetNewReportMethod={
        token:localStorage.getItem('token'),
        reportId:1.0,
        reportName:'',
    }
    // 修改报告方式信息
    getUpdateReportMethod:GetUpdateReportMethod={
        token:localStorage.getItem('token'),
        reportId:1.0,
        reportName:''
    }
    list:ListInt[]=[]//展示的内容数据
    
    updateIsShow=false
    insertIsShow=false
}