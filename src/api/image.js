import request from '@/utils/request'

//处理上传文章图片素材
export const uploadimage=(data)=>{
    return request({
        method:'POST',
        url:"/mp/v1_0/user/images",
        data
    })
}


//获取图片素材
export const getmages=(params)=>{
    return request({
        method:'GET',
        url:"/mp/v1_0/user/images",
        params
    })
}

//收藏图片
export const collectmages=(imageId,collect)=>{
    return request({
        method:'PUT',
        url:`/mp/v1_0/user/images/${imageId}`,
        data:{
            collect
        }
    })
}

//删除图片
export const deletmages=imageId=>{
    return request({
        method:'DELETE',
        url:`/mp/v1_0/user/images/${imageId}`,
    })
}