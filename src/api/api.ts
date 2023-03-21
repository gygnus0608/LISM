import service from "./request";
import {loginData} from '../type/login'
import {logoutData} from '../type/logout'
import {GetUserData,GetUserId,GetUserInfo,GetNewUser,DeleteUserInfo,GetUpdateUser,GetDepartmentData,GetDepartmentId} from '../type/user'
import {GetCustomerData,GetCustomerId,GetNewCustomer,DeleteCustomerInfo,GetUpdateCustomer} from '../type/customer'
import {GetSupplierData,GetSupplierId,GetNewSupplier,DeleteSupplierInfo,GetUpdateSupplier} from '../type/supplier'

import {DeleteTypeInfo,GetNewType,GetUpdateType} from '../type/contentType'

import {GetContentData,GetContentId,GetNewContent,DeleteContentInfo,GetUpdateContent,GetTypeData,GetTypeId,GetTemplateData,GetTemplateId,GetNewTemplate,GetUpdateTemplate,DeleteTemplateInfo} from '../type/testTemplate'

// 委托单
import {GetEntrustmentData,GetEntrustmentId,DeleteEntrustmentInfo,GetNewEntrustment,GetUpdateEntrustment} from '../type/entrustment'

// 委托单下属项目
import {GetOrderTestItemData,GetOrderTestItemId,DeleteOrderTestItemInfo,GetNewOrderTestItem,GetUpdateOrderTestItem,GetSelectEntrustmentData} from '../type/orderTestItem'

// 流转节点
import {GetNodeData,GetNodeId,DeleteNodeInfo,GetNewNode,GetUpdateNode} from '../type/flowNode'
// 测试协议
import {GetContractData,GetContractId,DeleteContractInfo,GetNewContract,GetUpdateContract} from '../type/testContract'
// 样品标签模板
import {GetSampleTemplateData,GetLevelId,GetLevelData,GetSampleTemplateId,DeleteSampleTemplateInfo,GetNewSampleTemplate,GetUpdateSampleTemplate} from '../type/sampleTemplate'
// 样品列表
import {GetSampleData,GetSampleId,DeleteSampleInfo,GetNewSample,GetUpdateSample} from '../type/sample'
// 样品档次列表
import {DeleteLevelInfo,GetNewLevel,GetUpdateLevel} from '../type/sampleLevel'
// 样品处理方式
import {GetDetailData,GetDetailId,DeleteDetailInfo,GetNewDetail,GetUpdateDetail} from '../type/sampleDetail'

// 任务流转单
import {GetCirculationData,GetCirculationId,DeleteCirculationInfo,GetNewCirculation,GetUpdateCirculation} from '../type/circulation'
// 检测结果
import {GetResultData,GetResultId,DeleteResultInfo,GetNewResult,GetUpdateResult} from '../type/testResult'

// 报告列表
import {GetReportData,GetReportId,DeleteReportInfo,GetNewReport,GetUpdateReport} from '../type/report'
// 报告处理方式
import {GetReportMethodData,GetReportMethodId,DeleteReportMethodInfo,GetNewReportMethod,GetUpdateReportMethod} from '../type/reportMethod'
// 检测数据名称
import {GetDataNameData,GetDataNameId,DeleteDataNameInfo,GetNewDataName,GetUpdateDataName} from '../type/dataName'
// 设备管理
import {GetEquipmentData,GetEquipmentId,DeleteEquipmentInfo,GetNewEquipment,GetUpdateEquipment} from '../type/equipment'
// 设备服务记录
import {GetServiceData,GetServiceId,DeleteServiceInfo,GetNewService,GetUpdateService} from '../type/equipmentService'
// 文件管理
import {GetFileData,GetFileId,DeleteFileInfo,GetNewFile,GetUpdateFile,GetFileTypeData,GetFileTypeId,DownLoadFile} from '../type/fileService'
// 文件类型管理
import {DeleteFileTypeInfo,GetNewFileType,GetUpdateFileType} from '../type/fileType'


import {GetAnalysisData} from '../type/analysis'
import {GetChartData} from '../type/chart'
// 登录
export function login(data:loginData){
    return service({
        url:"/Common/Login",
        method:"post",
        data
    })
}
// 登出
export function logout(data:logoutData){
    return service({
        url:"/Common/Logout",
        method:"post",
        data
    })
}
// 部门列表
export const getDepartmentList = (data:GetDepartmentData) =>service({
    url:'/LISM_department/GetDataTable',method:'post',data
})
// 通过departmentName获取departmentId
export const getDepartmentId = (data:GetDepartmentId) =>service({
    url:'/LISM_department/GetDepartmentId',method:'post',data
})





// 用户列表
export const getUserList = (data:GetUserData) =>service({
    url:'/LISM_users/GetDataTable',method:'post',data
})
// 通过username获取userid
export const getUserId = (data:GetUserId) =>service({
    url:'/LISM_users/GetUserId',method:'post',data
})
// 通过userid获取对应工作人员信息
export const getUserInfo = (data:GetUserInfo) =>service({
    url:'/LISM_users/Select',method:'post',data
})
// 删除工作人员信息
export const deleteUserInfo = (data:DeleteUserInfo) =>service({
    url:'/LISM_users/Delete',method:'post',data
})
// 新增工作人员信息
export const getNewUserInfo = (data:GetNewUser) =>service({
    url:'/LISM_users/Insert',method:'post',data
})
// 修改工作人员信息
export const getUpdateUserInfo = (data:GetUpdateUser) =>service({
    url:'/LISM_users/Update',method:'post',data
})





// 客户列表
export const getCustomerList = (data:GetCustomerData) =>service({
    url:'/LISM_customer/GetDataTable',method:'post',data
})
// 通过customerName获取customerId
export const getCustomerId = (data:GetCustomerId) =>service({
    url:'/LISM_customer/GetCustomerId',method:'post',data
})
// 删除客户信息
export const deleteCustomerInfo = (data:DeleteCustomerInfo) =>service({
    url:'/LISM_customer/Delete',method:'post',data
})
// 新增客户信息
export const getNewCustomerInfo = (data:GetNewCustomer) =>service({
    url:'/LISM_customer/Insert',method:'post',data
})
// 修改客户信息
export const getUpdateCustomerInfo = (data:GetUpdateCustomer) =>service({
    url:'/LISM_customer/Update',method:'post',data
})






// 供应商列表
export const getSupplierList = (data:GetSupplierData) =>service({
    url:'/LISM_supplier/GetDataTable',method:'post',data
})
// 通过supplierName获取supplierId
export const getSupplierId = (data:GetSupplierId) =>service({
    url:'/LISM_supplier/GetSupplierId',method:'post',data
})
// 删除供应商信息
export const deleteSupplierInfo = (data:DeleteSupplierInfo) =>service({
    url:'/LISM_supplier/Delete',method:'post',data
})
// 新增供应商信息
export const getNewSupplierInfo = (data:GetNewSupplier) =>service({
    url:'/LISM_supplier/Insert',method:'post',data
})
// 修改供应商信息
export const getUpdateSupplierInfo = (data:GetUpdateSupplier) =>service({
    url:'/LISM_supplier/Update',method:'post',data
})







// 检测项目列表
export const getContentList = (data:GetContentData) =>service({
    url:'/LISM_testContent/GetDataTable',method:'post',data
})
// 通过contentName获取contentId
export const getContentId = (data:GetContentId) =>service({
    url:'/LISM_testContent/GetContentId',method:'post',data
})
// 删除检测项目信息
export const deleteContentInfo = (data:DeleteContentInfo) =>service({
    url:'/LISM_testContent/Delete',method:'post',data
})
// 新增检测项目信息
export const getNewContentInfo = (data:GetNewContent) =>service({
    url:'/LISM_testContent/Insert',method:'post',data
})
// // 修改检测项目信息
export const getUpdateContentInfo = (data:GetUpdateContent) =>service({
    url:'/LISM_testContent/Update',method:'post',data
})




// 检测类型列表
export const getTypeList = (data:GetTypeData) =>service({
    url:'/LISM_testType/GetDataTable',method:'post',data
})
// 通过typeName获取typeId
export const getTypeId = (data:GetTypeId) =>service({
    url:'/LISM_testType/GetTypeId',method:'post',data
})
// 删除类型信息
export const deleteTypeInfo = (data:DeleteTypeInfo) =>service({
    url:'/LISM_testType/Delete',method:'post',data
})
// 新增类型信息
export const getNewTypeInfo = (data:GetNewType) =>service({
    url:'/LISM_testType/Insert',method:'post',data
})
// 修改类型信息
export const getUpdateTypeInfo = (data:GetUpdateType) =>service({
    url:'/LISM_testType/Update',method:'post',data
})







// 模板列表
export const getTemplateList = (data:GetTemplateData) =>service({
    url:'/LISM_testTemplate/GetDataTable',method:'post',data
})
// 通过templateName获取templateid
export const getTemplateId = (data:GetTemplateId) =>service({
    url:'/LISM_testTemplate/GetTemplateId',method:'post',data
})
// 删除模板信息
export const deleteTemplateInfo = (data:DeleteTemplateInfo) =>service({
    url:'/LISM_testTemplate/Delete',method:'post',data
})
// 新增模板信息
export const getNewTemplateInfo = (data:GetNewTemplate) =>service({
    url:'/LISM_testTemplate/Insert',method:'post',data
})
// 修改模板信息
export const getUpdateTemplateInfo = (data:GetUpdateTemplate) =>service({
    url:'/LISM_testTemplate/Update',method:'post',data
})









// 委托单列表
export const getEntrustmentList = (data:GetEntrustmentData) =>service({
    url:'/LISM_entrustment/GetDataTable',method:'post',data
})
// 通过entrustmentName获取entrustmentId
export const getEntrustmentId = (data:GetEntrustmentId) =>service({
    url:'/LISM_entrustment/GetEntrustmentId',method:'post',data
})
// 选择对应的委托单
export const selectEntrustment = (data:GetSelectEntrustmentData) =>service({
    url:'/LISM_entrustment/Select',method:'post',data
})
// 删除委托单信息
export const deleteEntrustmentInfo = (data:DeleteEntrustmentInfo) =>service({
    url:'/LISM_entrustment/Delete',method:'post',data
})
// 新增委托单信息
export const getNewEntrustmentInfo = (data:GetNewEntrustment) =>service({
    url:'/LISM_entrustment/Insert',method:'post',data
})
// 修改委托单信息
export const getUpdateEntrustmentInfo = (data:GetUpdateEntrustment) =>service({
    url:'/LISM_entrustment/Update',method:'post',data
})







// 委托单下属检测项目列表
export const getOrderTestItemList = (data:GetOrderTestItemData) =>service({
    url:'/LISM_orderTestItem/GetDataTable',method:'post',data
})
// 通过entrustmentName获取entrustmentId
export const getOrderTestItemId = (data:GetOrderTestItemId) =>service({
    url:'/LISM_orderTestItem/GetOrderTestId',method:'post',data
})
// 删除委托单下属检测项目
export const deleteOrderTestItemInfo = (data:DeleteOrderTestItemInfo) =>service({
    url:'/LISM_orderTestItem/Delete',method:'post',data
})
// 新增委托单下属检测项目
export const getNewOrderTestItemInfo = (data:GetNewOrderTestItem) =>service({
    url:'/LISM_orderTestItem/Insert',method:'post',data
})
// 修改委托单下属检测项目
export const getUpdateOrderTestItemInfo = (data:GetUpdateOrderTestItem) =>service({
    url:'/LISM_orderTestItem/Update',method:'post',data
})











// 检测流转节点列表
export const getNodeList = (data:GetNodeData) =>service({
    url:'/LISM_flowNode/GetDataTable',method:'post',data
})
// 通过nodeName获取nodeId
export const getNodeId = (data:GetNodeId) =>service({
    url:'/LISM_flowNode/GetNodeId',method:'post',data
})
// 删除流转节点信息
export const deleteNodeInfo = (data:DeleteNodeInfo) =>service({
    url:'/LISM_flowNode/Delete',method:'post',data
})
// 新增流转节点信息
export const getNewNodeInfo = (data:GetNewNode) =>service({
    url:'/LISM_flowNode/Insert',method:'post',data
})
// 修改流转节点信息
export const getUpdateNodeInfo = (data:GetUpdateNode) =>service({
    url:'/LISM_flowNode/Update',method:'post',data
})







// 检测测试协议列表
export const getContractList = (data:GetContractData) =>service({
    url:'/LISM_testContract/GetDataTable',method:'post',data
})
// 通过contractName获取contractId
export const getContractId = (data:GetContractId) =>service({
    url:'/LISM_testContract/GetContractId',method:'post',data
})
// 删除测试协议信息
export const deleteContractInfo = (data:DeleteContractInfo) =>service({
    url:'/LISM_testContract/Delete',method:'post',data
})
// 新增测试协议信息
export const getNewContractInfo = (data:GetNewContract) =>service({
    url:'/LISM_testContract/Insert',method:'post',data
})
// 修改测试协议信息
export const getUpdateContractInfo = (data:GetUpdateContract) =>service({
    url:'/LISM_testContract/Update',method:'post',data
})







// 样品列表
export const getSampleList = (data:GetSampleData) =>service({
    url:'/LISM_sample/GetDataTable',method:'post',data
})
// 通过sampleName获取sampleId
export const getSampleId = (data:GetSampleId) =>service({
    url:'/LISM_sample/GetSampleId',method:'post',data
})
// 删除样品信息
export const deleteSampleInfo = (data:DeleteSampleInfo) =>service({
    url:'/LISM_sample/Delete',method:'post',data
})
// 新增样品信息
export const getNewSampleInfo = (data:GetNewSample) =>service({
    url:'/LISM_sample/Insert',method:'post',data
})
// 修改样品信息
export const getUpdateSampleInfo = (data:GetUpdateSample) =>service({
    url:'/LISM_sample/Update',method:'post',data
})







// 样品标签模板列表
export const getSampleTemplateList = (data:GetSampleTemplateData) =>service({
    url:'/LISM_sampleTemplate/GetDataTable',method:'post',data
})
// 通过username获取userid
export const getSampleTemplateId = (data:GetSampleTemplateId) =>service({
    url:'/LISM_sampleTemplate/GetTemplateId',method:'post',data
})
// 删除样品标签模板信息
export const deleteSampleTemplateInfo = (data:DeleteSampleTemplateInfo) =>service({
    url:'/LISM_sampleTemplate/Delete',method:'post',data
})
// 新增样品标签模板信息
export const getNewSampleTemplateInfo = (data:GetNewSampleTemplate) =>service({
    url:'/LISM_sampleTemplate/Insert',method:'post',data
})
// 修改样品标签模板信息
export const getUpdateSampleTemplateInfo = (data:GetUpdateSampleTemplate) =>service({
    url:'/LISM_sampleTemplate/Update',method:'post',data
})







// 样品档次列表
export const getLevelList = (data:GetLevelData) =>service({
    url:'/LISM_sampleLevel/GetDataTable',method:'post',data
})
// 通过levelName获取levelId
export const getLevelId = (data:GetLevelId) =>service({
    url:'/LISM_sampleLevel/GetLevelId',method:'post',data
})
// 删除样品档次信息
export const deleteLevelInfo = (data:DeleteLevelInfo) =>service({
    url:'/LISM_sampleLevel/Delete',method:'post',data
})
// 新增样品档次信息
export const getNewLevelInfo = (data:GetNewLevel) =>service({
    url:'/LISM_sampleLevel/Insert',method:'post',data
})
// 修改样品档次信息
export const getUpdateLevelInfo = (data:GetUpdateLevel) =>service({
    url:'/LISM_sampleLevel/Update',method:'post',data
})








// 样品处理方式列表
export const getDetailList = (data:GetDetailData) =>service({
    url:'/LISM_sampleDetail/GetDataTable',method:'post',data
})
// 通过detailName获取detailId
export const getDetailId = (data:GetDetailId) =>service({
    url:'/LISM_sampleDetail/GetDetailId',method:'post',data
})
// 删除样品处理方式
export const deleteDetailInfo = (data:DeleteDetailInfo) =>service({
    url:'/LISM_sampleDetail/Delete',method:'post',data
})
// 新增样品处理方式
export const getNewDetailInfo = (data:GetNewDetail) =>service({
    url:'/LISM_sampleDetail/Insert',method:'post',data
})
// 修改样品处理方式
export const getUpdateDetailInfo = (data:GetUpdateDetail) =>service({
    url:'/LISM_sampleDetail/Update',method:'post',data
})












// 任务流转单列表
export const getCirculationList = (data:GetCirculationData) =>service({
    url:'/LISM_circulation/GetDataTable',method:'post',data
})
// 通过templateName获取templateid
export const getCirculationId = (data:GetCirculationId) =>service({
    url:'/LISM_circulation/GetCirculationId',method:'post',data
})
// 删除任务流转单
export const deleteCirculationInfo = (data:DeleteCirculationInfo) =>service({
    url:'/LISM_circulation/Delete',method:'post',data
})
// 新增任务流转单
export const getNewCirculation = (data:GetNewCirculation) =>service({
    url:'/LISM_circulation/Insert',method:'post',data
})
// 修改任务流转单
export const getUpdateCirculation = (data:GetUpdateCirculation) =>service({
    url:'/LISM_circulation/Update',method:'post',data
})











// 检测结果列表
export const getResultList = (data:GetResultData) =>service({
    url:'/LISM_testResult/GetDataTable',method:'post',data
})
// 通过resultName获取resultId
export const getResultId = (data:GetResultId) =>service({
    url:'/LISM_testResult/GetResultId',method:'post',data
})
// 删除任务流转单
export const deleteResultInfo = (data:DeleteResultInfo) =>service({
    url:'/LISM_testResult/Delete',method:'post',data
})
// 新增任务流转单
export const getNewResult = (data:GetNewResult) =>service({
    url:'/LISM_testResult/Insert',method:'post',data
})
// 修改任务流转单
export const getUpdateResult = (data:GetUpdateResult) =>service({
    url:'/LISM_testResult/Update',method:'post',data
})











// 报告列表
export const getReportList = (data:GetReportData) =>service({
    url:'/LISM_report/GetDataTable',method:'post',data
})
// 通过reportName获取reportId
export const getReportId = (data:GetReportId) =>service({
    url:'/LISM_testTemplate/GetTemplateId',method:'post',data
})
// 删除报告信息
export const deleteReportInfo = (data:DeleteReportInfo) =>service({
    url:'/LISM_testTemplate/Delete',method:'post',data
})
// 新增报告信息
export const getNewReportInfo = (data:GetNewReport) =>service({
    url:'/LISM_testTemplate/Insert',method:'post',data
})
// 修改报告信息
export const getUpdateReportInfo = (data:GetUpdateReport) =>service({
    url:'/LISM_testTemplate/Update',method:'post',data
})














// 报告方式列表
export const getReportMethodList = (data:GetReportMethodData) =>service({
    url:'/LISM_reportMethod/GetDataTable',method:'post',data
})
// 通过ReportMethodName获取ReportMethodId
export const getReportMethodId = (data:GetReportMethodId) =>service({
    url:'/LISM_reportMethod/GetReportId',method:'post',data
})
// 删除报告方式
export const deleteReportMethodInfo = (data:DeleteReportMethodInfo) =>service({
    url:'/LISM_reportMethod/Delete',method:'post',data
})
// 新增报告方式
export const getNewReportMethodInfo = (data:GetNewReportMethod) =>service({
    url:'/LISM_reportMethod/Insert',method:'post',data
})
// 修改报告方式
export const getUpdateReportMethodInfo = (data:GetUpdateReportMethod) =>service({
    url:'/LISM_reportMethod/Update',method:'post',data
})












// 检测数据名称列表
export const getDataNameList = (data:GetDataNameData) =>service({
    url:'/LISM_dataName/GetDataTable',method:'post',data
})
// 通过DataNameName获取DataNameId
export const getDataNameId = (data:GetDataNameId) =>service({
    url:'/LISM_dataName/GetDataNameId',method:'post',data
})
// 删除检测数据名称
export const deleteDataNameInfo = (data:DeleteDataNameInfo) =>service({
    url:'/LISM_dataName/Delete',method:'post',data
})
// 新增检测数据名称
export const getNewDataNameInfo = (data:GetNewDataName) =>service({
    url:'/LISM_dataName/Insert',method:'post',data
})
// 修改检测数据名称
export const getUpdateDataNameInfo = (data:GetUpdateDataName) =>service({
    url:'/LISM_dataName/Update',method:'post',data
})













// 设备列表
export const getEquipmentList = (data:GetEquipmentData) =>service({
    url:'/LISM_equipment/GetDataTable',method:'post',data
})
// 通过EquipmentName获取EquipmentId
export const getEquipmentId = (data:GetEquipmentId) =>service({
    url:'/LISM_equipment/GetEquipmentId',method:'post',data
})
// 删除供应商信息
export const deleteEquipmentInfo = (data:DeleteEquipmentInfo) =>service({
    url:'/LISM_equipment/Delete',method:'post',data
})
// 新增供应商信息
export const getNewEquipmentInfo = (data:GetNewEquipment) =>service({
    url:'/LISM_equipment/Insert',method:'post',data
})
// 修改供应商信息
export const getUpdateEquipmentInfo = (data:GetUpdateEquipment) =>service({
    url:'/LISM_equipment/Update',method:'post',data
})













// 设备服务记录列表
export const getServiceList = (data:GetServiceData) =>service({
    url:'/LISM_equipmentService/GetDataTable',method:'post',data
})
// 通过servicename获取serviceid
export const getServiceId = (data:GetServiceId) =>service({
    url:'/LISM_equipmentService/GetServiceId',method:'post',data
})
// 删除设备服务记录信息
export const deleteServiceInfo = (data:DeleteServiceInfo) =>service({
    url:'/LISM_equipmentService/Delete',method:'post',data
})
// 新增设备服务记录信息
export const getNewServiceInfo = (data:GetNewService) =>service({
    url:'/LISM_equipmentService/Insert',method:'post',data
})
// 修改设备服务记录信息
export const getUpdateServiceInfo = (data:GetUpdateService) =>service({
    url:'/LISM_equipmentService/Update',method:'post',data
})












// 文件类型列表
export const getFileTypeList = (data:GetFileTypeData) =>service({
    url:'/LISM_fileType/GetDataTable',method:'post',data
})
// 通过FileTypeName获取FileTypeId
export const getFileTypeId = (data:GetFileTypeId) =>service({
    url:'/LISM_fileType/GetFileTypeId',method:'post',data
})
// 删除文件类型信息
export const deleteFileTypeInfo = (data:DeleteFileTypeInfo) =>service({
    url:'/LISM_fileType/Delete',method:'post',data
})
// 新增文件类型信息
export const getNewFileTypeInfo = (data:GetNewFileType) =>service({
    url:'/LISM_fileType/Insert',method:'post',data
})
// 修改文件类型信息
export const getUpdateFileTypeInfo = (data:GetUpdateFileType) =>service({
    url:'/LISM_fileType/Update',method:'post',data
})












// 文件列表
export const getFileList = (data:GetFileData) =>service({
    url:'/LISM_fileService/GetDataTable',method:'post',data
})
// 通过Filename获取Fileid
export const getFileId = (data:GetFileId) =>service({
    url:'/LISM_fileService/GetFileId',method:'post',data
})
// 删除文件信息
export const deleteFileInfo = (data:DeleteFileInfo) =>service({
    url:'/LISM_fileService/Delete',method:'post',data
})
// 新增文件信息
export const getNewFileInfo = (data:FormData) =>service({
    url:'/LISM_fileService/Insert',method:'post',data
})
// 修改文件信息
export const getUpdateFileInfo = (data:GetUpdateFile) =>service({
    url:'/LISM_fileService/Update',method:'post',data
})
// 下载文件
export const downLoadFile = (data:DownLoadFile) =>service({
    url:'/LISM_fileService/Download',method:'post',data
})








// 统计分析图表
export const getChartList = (data:GetChartData) =>service({
    url:'/LISM_chartType/GetDataTable',method:'post',data
})
// 统计分析结果列表
export const getAnalysisList = (data:GetAnalysisData) =>service({
    url:'/LISM_analysis/GetDataTable',method:'post',data
})