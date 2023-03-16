export interface ListInt{
    NODEID:number,
    NODENAME:string,
}
// 展示流转节点列表
export interface GetNodeData{
    token:any
}
// 通过NodeName获取NodeId
export interface GetNodeId{
    token:any,
    nodeName:string
}
// 新增流转节点信息
export interface GetNewNode{
    token:any,
    nodeId:number,
    nodeName:string,
}
// 修改流转节点信息
export interface GetUpdateNode{
    token:any,
    nodeId:number,
    nodeName:string,
}
// 删除流转节点信息
export interface DeleteNodeInfo{
    token:any,
    nodeId:number
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
    // 展示所有流转节点信息
    token:GetNodeData={
        token:localStorage.getItem('token')
    }
    // 通过NodeName查询NodeId
    getNodeId:GetNodeId={
        token:localStorage.getItem('token'),
        nodeName:''
    }
    // 删除流转节点信息
    deleteNodeInfo:DeleteNodeInfo={
        token:localStorage.getItem('token'),
        nodeId:1
    }
    // 添加流转节点信息
    getNewNode:GetNewNode={
        token:localStorage.getItem('token'),
        nodeId:1.0,
        nodeName:'',
    }
    // 修改流转节点信息
    getUpdateNode:GetUpdateNode={
        token:localStorage.getItem('token'),
        nodeId:1.0,
        nodeName:''
    }
    list:ListInt[]=[]//展示的内容数据
    
    updateIsShow=false
    insertIsShow=false
}