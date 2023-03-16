export interface ListInt{
    SAMPLEID:number,
    SAMPLENAME:string,
    SUPPLIERNAME:string,
    BARCODE:string,
    INBOUND:number,
    OUTBOUND:number,
    EXPIRETIME:string,
    LEVELNAME:string,
    TEMPLATENAME:string,
    STBATCH:string,
    STMODE:string,
    STNUM:number,
    RECEIVENUM:number,
    DISTRIBUTENUM:number,
}
// 展示样品标签列表
export interface SampleTemplateListInt{
    TEMPLATEID:number,
    TEMPLATENAME:string,
    STBATCH:string,
    STMODE:string,
    STNUM:number,
    RECEIVENUM:number,
    DISTRIBUTENUM:number,
}
// 展示供应商列表
export interface SupplierListInt{
    SUPPLIERID:number,
    SUPPLIERNAME:string
}
// 展示样品档次列表
export interface LevelListInt{
    LEVELID:number,
    LEVELNAME:string
}

// 展示样品标签列表
export interface GetSampleTemplateData{
    token:any
}
// 通过sampleTemplateName获取sampleTemplateId
export interface GetSampleTemplateId{
    token:any,
    templateName:string
}
// 展示供应商列表
export interface GetSupplierData{
    token:any
}
// 通过supplierName获取supplierId
export interface GetSupplierId{
    token:any,
    supplierName:string
}
// 展示样品档次列表
export interface GetLevelData{
    token:any
}
// 通过levelName获取levelId
export interface GetLevelId{
    token:any,
    levelName:string
}

// 展示样品列表
export interface GetSampleData{
    token:any
}
// 通过sampleName获取sampleId
export interface GetSampleId{
    token:any,
    sampleName:string
}
// 新增样品信息
export interface GetNewSample{
    token:any,
    sampleId:number,
    sampleName:string,
    templateName:string,
    supplierName:string,
    barcode:string,
    inbound:number,
    outbound:number,
    expireTime:string,
    levelName:string,
    stBatch:string,
    stMode:string,
    stNum:number,
    receiveNum:number,
    distributeNum:number
}
// 修改样品信息
export interface GetUpdateSample{
    token:any,
    sampleId:number,
    sampleName:string,
    templateName:string,
    supplierName:string,
    barcode:string,
    inbound:number,
    outbound:number,
    expireTime:string,
    levelName:string,
    stBatch:string,
    stMode:string,
    stNum:number,
    receiveNum:number,
    distributeNum:number
}
// 删除样品信息
export interface DeleteSampleInfo{
    token:any,
    sampleId:number
}
// 通过sampleId获取数据
export interface GetSampleIdToInfo{
    token:any,
    sampleId:number
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
    // 展示所有样品信息
    token:GetSampleData={
        token:localStorage.getItem('token')
    }
    // 通过sampleName查询sampleId
    getSampleId:GetSampleId={
        token:localStorage.getItem('token'),
        sampleName:''
    }
    // 删除样品信息
    deleteSampleInfo:DeleteSampleInfo={
        token:localStorage.getItem('token'),
        sampleId:1
    }
    // 添加样品信息
    getNewSample:GetNewSample={
        token:localStorage.getItem('token'),
        sampleId:1,
        sampleName:'',
        templateName:'',
        supplierName:'',
        barcode:'',
        inbound:0,
        outbound:0,
        expireTime:'',
        levelName:'',
        stBatch:'',
        stMode:'',
        stNum:0,
        receiveNum:0,
        distributeNum:0
    }
    // 修改样品信息
    getUpdateSample:GetUpdateSample={
        token:localStorage.getItem('token'),
        sampleId:1,
        sampleName:'',
        templateName:'',
        supplierName:'',
        barcode:'',
        inbound:0,
        outbound:0,
        expireTime:'',
        levelName:'',
        stBatch:'',
        stMode:'',
        stNum:0,
        receiveNum:0,
        distributeNum:0
    }
    list:ListInt[]=[]//展示的内容数据

    sampleTemplate:SampleTemplateListInt[]=[]

    supplier:SupplierListInt[]=[]

    level:LevelListInt[]=[]

    sampleTemplateToken:GetSampleTemplateData={
        token:localStorage.getItem('token')
    }
    // 通过sampleTemplateName获取sampleTemplateId 
    getSampleTemplateId:GetSampleTemplateId={
        token:localStorage.getItem('token'),
        templateName:''
    }

    supplierToken:GetSupplierData={
        token:localStorage.getItem('token')
    }
    // 通过supplierName获取supplierId 
    getSupplierId:GetSupplierId={
        token:localStorage.getItem('token'),
        supplierName:''
    }
    
    levelToken:GetLevelData={
        token:localStorage.getItem('token')
    }
    updateIsShow=false
    insertIsShow=false
}