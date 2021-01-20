import request from '@/utils/request'

//修改文章评论状态
export const updateimage=(articleId,Allowcomment)=>{
    return request({
        method:'PUT',
        url:"/mp/v1_0/comments/status",
        params:{
            article_id:articleId
        },
        data:{
            allow_comment:Allowcomment
        }
    })
}
