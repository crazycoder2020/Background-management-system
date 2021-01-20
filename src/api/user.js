//引入登录基本路径
import requst from '../utils/request'

//用户登录数据请求
export const login=(data)=>{
    return requst({
        method:'POST',
        url:'/mp/v1_0/authorizations',
        data
    })
}

//用户登录信息
export const getUserProfile=()=>{
    // const user =JSON.parse(window.localStorage.getItem('user'));
    return requst({
        method:'GET',
        url:'/mp/v1_0/user/profile',
        //根据接口文档设置请求头
        // headers:{
        //     Authorization :`Bearer ${user.token}`
        // }
    })
}

//修改用户头像
export const uploadUserPhoto=(data)=>{
    // const user =JSON.parse(window.localStorage.getItem('user'));
    return requst({
        method:'PATCH',
        url:'/app/v1_0/user/photo',
        data
    })
}

//修改用户个人信息
export const uploadUserProfile=(data)=>{
    // const user =JSON.parse(window.localStorage.getItem('user'));
    return requst({
        method:'PATCH',
        url:'/app/v1_0/user/profile',
        data
    })
}
