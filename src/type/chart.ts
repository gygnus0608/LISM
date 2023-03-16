export interface ListInt{
    chartTypeId:number,
    chartTypeName:string,
}
// 展示图表结果列表
export interface GetChartData{
    token:any
}
interface selectDataInt{
    chartTypeName:string,
    page:number,//页码
    count:number,//总条数
    pagesize:number,//默认一页显示几条
}
export class InitData{
    selectData:selectDataInt={
        chartTypeName:'',
        page:1,
        count:0,//总数
        pagesize:5 //一页放多少条数据
    }
    // 展示图表结果列表
    token:GetChartData={
        token:localStorage.getItem('token')
    }
    list:ListInt[]=[]//展示的内容数据
    updateIsShow=false
    insertIsShow=false
}