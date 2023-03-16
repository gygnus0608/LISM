export interface ListInt{
    FILETYPEID:number,
    FILETYPENAME:string,
}
// 展示文件类型列表
export interface GetFileTypeData{
    token:any
}
// 通过FileTypeName获取FileTypeId
export interface GetFileTypeId{
    token:any,
    fileTypeName:string
}
// 新增文件类型信息
export interface GetNewFileType{
    token:any,
    fileTypeId:number,
    fileTypeName:string,
}
// 修改文件类型信息
export interface GetUpdateFileType{
    token:any,
    fileTypeId:number,
    fileTypeName:string,
}
// 删除文件类型信息
export interface DeleteFileTypeInfo{
    token:any,
    fileTypeId:number
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
    // 展示所有文件类型信息
    token:GetFileTypeData={
        token:localStorage.getItem('token')
    }
    // 通过FileTypeName查询FileTypeId
    getFileTypeId:GetFileTypeId={
        token:localStorage.getItem('token'),
        fileTypeName:''
    }
    // 删除文件类型信息
    deleteFileTypeInfo:DeleteFileTypeInfo={
        token:localStorage.getItem('token'),
        fileTypeId:1
    }
    // 添加文件类型信息
    getNewFileType:GetNewFileType={
        token:localStorage.getItem('token'),
        fileTypeId:1.0,
        fileTypeName:'',
    }
    // 修改文件类型信息
    getUpdateFileType:GetUpdateFileType={
        token:localStorage.getItem('token'),
        fileTypeId:1.0,
        fileTypeName:''
    }
    list:ListInt[]=[]//展示的内容数据
    
    updateIsShow=false
    insertIsShow=false
}