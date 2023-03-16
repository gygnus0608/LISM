// 登出
export interface logoutData{
    token:any
}
export class LogoutInitData{
    token:logoutData={
        token:localStorage.getItem('token')
    }
}