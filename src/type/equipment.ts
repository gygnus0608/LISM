export interface ListInt{
    EQUIPMENTID:number,
    EQUIPMENTNAME:string,
    CHANNELNUM:number,
    EQUIPMENTMODEL:string,
    REMARKS:string,
}
// 展示设备列表
export interface GetEquipmentData{
    token:any
}
// 通过equipmentName获取equipmentId
export interface GetEquipmentId{
    token:any,
    equipmentName:string
}
// 新增设备信息
export interface GetNewEquipment{
    token:any,
    equipmentId:number,
    equipmentName:string,
    channelNum:number,
    equipmentModel:string,
    remarks:string
}
// 修改设备信息
export interface GetUpdateEquipment{
    token:any,
    equipmentId:number,
    equipmentName:string,
    channelNum:number,
    equipmentModel:string,
    remarks:string
}
// 删除设备信息
export interface DeleteEquipmentInfo{
    token:any,
    equipmentId:number
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
    // 展示所有设备信息
    token:GetEquipmentData={
        token:localStorage.getItem('token')
    }
    // 通过EquipmentName查询EquipmentId
    getEquipmentId:GetEquipmentId={
        token:localStorage.getItem('token'),
        equipmentName:''
    }
    // 删除设备信息
    deleteEquipmentInfo:DeleteEquipmentInfo={
        token:localStorage.getItem('token'),
        equipmentId:1
    }
    // 添加设备信息
    getNewEquipment:GetNewEquipment={
        token:localStorage.getItem('token'),
        equipmentId:1.0,
        equipmentName:'',
        channelNum:1,
        equipmentModel:'',
        remarks:''
    }
    // 修改设备信息
    getUpdateEquipment:GetUpdateEquipment={
        token:localStorage.getItem('token'),
        equipmentId:1.0,
        equipmentName:'',
        channelNum:1,
        equipmentModel:'',
        remarks:''
    }
    list:ListInt[]=[]//展示的内容数据
    
    updateIsShow=false
    insertIsShow=false
}