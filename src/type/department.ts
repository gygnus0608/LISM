export interface DepartmentListInt{
    departmentId:number,
    departmentName:string,
    userId:number,
}
// 展示部门列表
export interface GetDepartmentData{
    token:any
}
// 通过departmentName获取departmentId
export interface GetDepartmentId{
    token:any,
    departmentName:string
}
// interface selectDataInt{
//     departmentName:string,
//     page:number,//页码
//     count:number,//总条数
//     pagesize:number,//默认一页显示几条
// }
export class DepartmentInitData{
    // selectData:selectDataInt={
    //     departmentName:'',
    //     page:1,
    //     count:0,//总数
    //     pagesize:5 //一页放多少条数据
    // }
    // 展示部门列表
    token:GetDepartmentData={
        token:localStorage.getItem('token')
    }
    // 通过departmentName获取departmentId 
    getDepartmentId:GetDepartmentId={
        token:localStorage.getItem('token'),
        departmentName:''
    }
    list:DepartmentListInt[]=[]//展示的内容数据
    updateIsShow=false
    insertIsShow=false
}