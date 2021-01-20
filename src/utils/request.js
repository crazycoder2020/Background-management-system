import axios from 'axios';
import JSONbigint from 'json-bigint'

//创建axios实例
const requst=axios.create({
    baseURL:'http://api-toutiao-web.itheima.net',
    transformResponse:[function(data){
        try {
            //如果转化成功则直接将结果返回
            return JSONbigint.parse(data)
        } catch (error) { 
            //如果转化失败则原封不动的返回给请求使用
            return data
        }
    }]
});

//设置请求拦截器
requst.interceptors.request.use(
    function(config){
        const user =JSON.parse(window.localStorage.getItem('user'));

        //如果有用户登录 同意设置token
        if(user){
            config.headers.Authorization=`Bearer ${user.token}`
        }
        return config
    },
    function(error){
        return Promise.reject(error)
    }
)

//

//导出请求方法
export default requst;  