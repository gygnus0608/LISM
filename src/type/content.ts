export interface ListInt{
    CONTENTID:number,
    CONTENTNAME:string,
    TYPEID:number,
    TYPENAME:string,
    TEMPMAX:number,
    TEMPMIN:number,
    TEMPSTANDARD:number,
    TEMPSTANDARDHOUR:number,
    TEMPREMIND:number,
    TEMPMETHOD:string,
    TEMPREQUIRE:string,
}
interface selectDataInt{
    page:number,//页码
    count:number,//总条数
    pagesize:number,//默认一页显示几条
}
export class ContentInitData{
    selectData:selectDataInt={
        page:1,
        count:0,//总数
        pagesize:5 //一页放多少条数据
    }
    list:ListInt[]=[]
    updateIsShow=false
    insertIsShow=false
}