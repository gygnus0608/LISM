// 登录
export interface loginData{
    userName:string,
    userPwd:string
}
export class LoginInitData{
    token:loginData={
        // token:localStorage.getItem('token')
        userName:localStorage.getItem('token'),
        userPwd:''
    }
}