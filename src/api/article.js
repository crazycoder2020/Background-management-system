//引入登录基本路径
import requst from '../utils/request'

// 文章列表数据
export const getUserArticles= params =>{
    return requst({
        method:'GET',
        url:'/mp/v1_0/articles',

        //Body 参数使用data
        //Query 参数使用params
        //Headers 参数使用 headers设置
        params
    })
}

// 文章频道数据
export const getUserChannel= () =>{
    return requst({
        method:'GET',
        url:'/mp/v1_0/channels'
    })
}

//删除文章
export const deletArticle= articleId =>{
    return requst({
        url:`/mp/v1_0/articles/${articleId}`
    })
}

//发布文章
export const addArticle=(data,draft=false)=>{
    return requst({
        method:'POST',
        url:'/mp/v1_0/articles',
        params:{
            draft
        },
        data
    })
}

//修改文章
export const updateArticle=(articleId,data,draft=false)=>{
    return requst({
        method:"PUT",
        url:`/mp/v1_0/articles/${articleId}`,
        params:{
            draft
        },
        data
    })
}

//获取文章
export const getArticle=(articleId)=>{
    return requst({
        method:"GET",
        url:`/mp/v1_0/articles/${articleId}`,
    })
}