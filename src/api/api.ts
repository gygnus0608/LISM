import request from "./request";
export default{
    allUser(){
        return request({
            url:'/allUser',method:'get',mock:true
        })
    }
}