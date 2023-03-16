export interface ListInt{
    USERID:number,
    USERNAME:string,
    GENDER:string,
    DEPARTMENTNAME:string,
    BIRTHDAY:string,
    ADDRESS:string,
    PHONE:string,
    USERPWD:string
    MAIL:string,
    USERROLE:number
}
// 展示部门列表
export interface DepartmentListInt{
    USERID:number,
    DEPARTMENTID:number,
    DEPARTMENTNAME:string,
    
}
export interface GetDepartmentData{
    token:any
}
// 通过departmentName获取departmentId
export interface GetDepartmentId{
    token:any,
    departmentName:string
}
// 展示用户列表
export interface GetUserData{
    token:any
}
// 通过username获取userid
export interface GetUserId{
    token:any,
    userName:string
}
// 通过userid获取对应工作人员信息
export interface GetUserInfo{
    token:any,
    userId:number
}
// 新增工作人员信息
export interface GetNewUser{
    token:any,
    userId:number,
    userName:string,
    gender:string,
    departmentName:string,
    birthday:string,
    address:string,
    phone:string,
    mail:string,
    userPwd:string,
    userRole:number
}
// 修改工作人员信息
export interface GetUpdateUser{
    token:any,
    userId:number,
    userName:string,
    gender:string,
    departmentName:string,
    birthday:string,
    address:string,
    phone:string,
    mail:string,
    userPwd:string,
    userRole:number
}
// 删除工作人员信息
export interface DeleteUserInfo{
    token:any,
    userId:number
}
interface selectDataInt{
    // userId:number,
    // userName:string,
    // departmentName:string,
    page:number,//页码
    count:number,//总条数
    pagesize:number,//默认一页显示几条
}
export class InitData{
    selectData:selectDataInt={
        // userId:1.0,
        // userName:'',
        // departmentName:'',
        page:1,
        count:0,//总数
        pagesize:5 //一页放多少条数据
    }
    // 展示所有工作人员信息
    token:GetUserData={
        token:localStorage.getItem('token')
    }
    // 通过userName查询userId
    getUserId:GetUserId={
        token:localStorage.getItem('token'),
        userName:''
    }
    // 通过userid查询对应工作人员信息
    getUserInfo:GetUserInfo={
        token:localStorage.getItem('token'),
        userId:1.0
    }
    // 删除工作人员信息
    deleteUserInfo:DeleteUserInfo={
        token:localStorage.getItem('token'),
        userId:1
    }
    // 添加工作人员信息
    getNewUser:GetNewUser={
        token:localStorage.getItem('token'),
        userId:1.0,
        userName:'',
        gender:'',
        departmentName:'',
        birthday:'',
        address:'',
        phone:'',
        mail:'',
        userPwd:'',
        userRole:4
    }
    // 修改工作人员信息
    getUpdateUser:GetUpdateUser={
        token:localStorage.getItem('token'),
        userId:1.0,
        userName:'',
        gender:'',
        departmentName:'',
        birthday:'',
        address:'',
        phone:'',
        mail:'',
        userPwd:'',
        userRole:4
    }
    list:ListInt[]=[]//展示的内容数据

    department:DepartmentListInt[]=[]

    departmentToken:GetDepartmentData={
        token:localStorage.getItem('token')
    }
    // 通过departmentName获取departmentId 
    getDepartmentId:GetDepartmentId={
        token:localStorage.getItem('token'),
        departmentName:''
    }
    
    updateIsShow=false
    insertIsShow=false
}