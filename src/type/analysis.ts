export interface ListInt{
    analysisId:number,
    analysisName:string,
    templateName:string,
    orderTestName:string,
    analysisFile:string,
}
// 展示统计分析结果列表
export interface GetAnalysisData{
    token:any
}
interface selectDataInt{
    analysisName:string,
    templateName:string,
    orderTestName:string,
    page:number,//页码
    count:number,//总条数
    pagesize:number,//默认一页显示几条
}
export class InitData{
    selectData:selectDataInt={
        analysisName:'',
        templateName:'',
        orderTestName:'',
        page:1,
        count:0,//总数
        pagesize:5 //一页放多少条数据
    }
    // 展示统计分析结果列表
    token:GetAnalysisData={
        token:localStorage.getItem('token')
    }
    list:ListInt[]=[]//展示的内容数据
    updateIsShow=false
    insertIsShow=false
}