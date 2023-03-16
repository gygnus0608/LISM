export interface ListInt{
    TEMPLATEID:number,
    TEMPLATENAME:string,
    TYPENAME:string,
    CONTENTNAME:string,
    TEMPMAX:number,
    TEMPMIN:number,
    TEMPSTANDARD:number,
    TEMPSTANDARDHOUR:number
    TEMPREMIND:number,
    TEMPMETHOD:string
    TEMPREQUIRE:string
}
// 展示检测项目列表
export interface contentListInt{
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
// 展示检测类型列表
export interface typeListInt{
    TYPEID:number,
    TYPENAME:string,
}

// 展示检测项目列表
export interface GetContentData{
    token:any
}
// 通过contentName获取contentId
export interface GetContentId{
    token:any,
    contentName:string
}
// 新增检测项目信息
export interface GetNewContent{
    token:any,
    contentId:number,
    contentName:string,
    typeName:string,
    tempMax:number,
    tempMin:number,
    tempStandard:number,
    tempStandardHour:number,
    tempRemind:number,
    tempMethod:string,
    tempRequire:string
}
// 修改检测项目信息
export interface GetUpdateContent{
    token:any,
    contentId:number,
    contentName:string,
    typeName:string,
    tempMax:number,
    tempMin:number,
    tempStandard:number,
    tempStandardHour:number,
    tempRemind:number,
    tempMethod:string,
    tempRequire:string
}
// 删除检测项目信息
export interface DeleteContentInfo{
    token:any,
    contentId:number
}

// 展示检测类型列表
export interface GetTypeData{
    token:any
}
// 通过typeName获取typeId
export interface GetTypeId{
    token:any,
    typeName:string
}

// 展示模板列表
export interface GetTemplateData{
    token:any
}
// 通过templateName获取templateId
export interface GetTemplateId{
    token:any,
    templateName:string
}
// 新增模板信息
export interface GetNewTemplate{
    token:any,
    templateId:number,
    templateName:string,
    typeName:string,
    contentName:string,
    tempMax:number,
    tempMin:number,
    tempStandard:number,
    tempStandardHour:number,
    tempRemind:number,
    tempMethod:string,
    tempRequire:string
}
// 修改工作人员信息
export interface GetUpdateTemplate{
    token:any,
    templateId:number,
    templateName:string,
    typeName:string,
    contentName:string,
    tempMax:number,
    tempMin:number,
    tempStandard:number,
    tempStandardHour:number,
    tempRemind:number,
    tempMethod:string,
    tempRequire:string
}
// 删除模板信息
export interface DeleteTemplateInfo{
    token:any,
    templateId:number
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
    list:ListInt[]=[]//展示的内容数据

    content:contentListInt[]=[]

    type:typeListInt[]=[]
    // 展示所有模板信息
    token:GetTemplateData={
        token:localStorage.getItem('token')
    }
    // 通过templateName查询templateId
    getTemplateId:GetTemplateId={
        token:localStorage.getItem('token'),
        templateName:''
    }
    // 删除模板信息
    deleteTemplateInfo:DeleteTemplateInfo={
        token:localStorage.getItem('token'),
        templateId:1
    }
    // 添加模板信息
    getNewTemplate:GetNewTemplate={
        token:localStorage.getItem('token'),
        templateId:1,
        templateName:'',
        typeName:'',
        contentName:'',
        tempMax:0,
        tempMin:0,
        tempStandard:0,
        tempStandardHour:0,
        tempRemind:0,
        tempMethod:'',
        tempRequire:''
    }
    // 修改模板信息
    getUpdateTemplate:GetUpdateTemplate={
        token:localStorage.getItem('token'),
        templateId:1,
        templateName:'',
        typeName:'',
        contentName:'',
        tempMax:0,
        tempMin:0,
        tempStandard:0,
        tempStandardHour:0,
        tempRemind:0,
        tempMethod:'',
        tempRequire:''
    }
    
    // 展示所有检测项目信息
    contentToken:GetContentData={
        token:localStorage.getItem('token')
    }
    // 通过contentName获取contentId 
    getContentId:GetContentId={
        token:localStorage.getItem('token'),
        contentName:''
    }
    // 删除检测项目信息
    deleteContentInfo:DeleteContentInfo={
        token:localStorage.getItem('token'),
        contentId:1
    }
    // 添加检测项目信息
    getNewContent:GetNewContent={
        token:localStorage.getItem('token'),
        contentId:1,
        contentName:'',
        typeName:'',
        tempMax:0,
        tempMin:0,
        tempStandard:0,
        tempStandardHour:0,
        tempRemind:0,
        tempMethod:'',
        tempRequire:''
    }
    // 修改检测项目信息
    getUpdateContent:GetUpdateContent={
        token:localStorage.getItem('token'),
        contentId:1,
        contentName:'',
        typeName:'',
        tempMax:0,
        tempMin:0,
        tempStandard:0,
        tempStandardHour:0,
        tempRemind:0,
        tempMethod:'',
        tempRequire:''
    }

    // 展示所有项目类型
    typeToken:GetTypeData={
        token:localStorage.getItem('token')
    }
    // 通过typeName获取typeId 
    getTypeId:GetTypeId={
        token:localStorage.getItem('token'),
        typeName:''
    }
    
    updateIsShow=false
    insertIsShow=false
}