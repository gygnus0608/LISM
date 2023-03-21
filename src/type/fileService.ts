export interface ListInt{
    FILEID:number,
    FILENAME:string,
    FILETYPENAME:string,
    FILEPATH:string,
    MODIFICATIONTIME:string,
    REMARKS:string,
}
// 展示文件类型列表
export interface fileTypeListInt{
    FILETYPEID:number,
    FILETYPENAME:string,
    
}
export interface GetFileTypeData{
    token:any
}
// 通过fileTypeName获取fileTypeId
export interface GetFileTypeId{
    token:any,
    fileTypeName:string
}
// 展示文件列表
export interface GetFileData{
    token:any
}
// 通过filename获取fileid
export interface GetFileId{
    token:any,
    fileName:string
}
// 新增文件信息
export interface GetNewFile{
    token:any,
    fileId:number,
    myFile:string,
    fileTypeName:string,
    remarks:string
    input:string
}
// 修改文件信息
export interface GetUpdateFile{
    token:any,
    fileId:number,
    myFile:string,
    fileTypeName:string,
    remarks:string
}
// 删除文件信息
export interface DeleteFileInfo{
    token:any,
    fileId:number
}
// 下载文件信息
export interface DownLoadFile{
    token:any,
    fileId:number
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
    // 展示所有文件信息
    token:GetFileData={
        token:localStorage.getItem('token')
    }
    // 通过FileName查询FileId
    getFileId:GetFileId={
        token:localStorage.getItem('token'),
        fileName:''
    }
    // 删除文件信息
    deleteFileInfo:DeleteFileInfo={
        token:localStorage.getItem('token'),
        fileId:1
    }
    // 添加文件信息
    getNewFile:GetNewFile={
        token:localStorage.getItem('token'),
        fileId:1,
        myFile:'',
        fileTypeName:'',
        remarks:'',
        input:''
    }
    // 修改文件信息
    getUpdateFile:GetUpdateFile={
        token:localStorage.getItem('token'),
        fileId:1,
        myFile:'',
        fileTypeName:'',
        remarks:''
    }
    // 通过FileId下载
    downLoadFile:DownLoadFile={
        token:localStorage.getItem('token'),
        fileId:1
    }
    list:ListInt[]=[]//展示的内容数据

    fileType:fileTypeListInt[]=[]

    fileTypeToken:GetFileTypeData={
        token:localStorage.getItem('token')
    }
    // 通过fileTypeName获取fileTypeId 
    getFileTypeId:GetFileTypeId={
        token:localStorage.getItem('token'),
        fileTypeName:''
    }
    // filePath:filePathInt[]=[]//接收文件路径
    updateIsShow=false
    insertIsShow=false
}