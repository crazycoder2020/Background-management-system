import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/login.vue'
import Home from '@/views/home/home.vue'
import Layout from '@/views/layout/layout.vue'
import Article from '@/views/article/article.vue'
import Publish from '@/views/publish/publish.vue'
import Image from '@/views/imag/image.vue'
import Comment from '@/views/comment/comment.vue'
import Setting from '@/views/setings/setting.vue'
import Fans from '@/views/fans/fans.vue'

Vue.use(VueRouter)

const routes = [
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:"/",
      component:Layout,
      children:[
        {
          path:'',
          name:'home',
          component:Home
        },
        {
          path:'/article',
          name:'article',
          component:Article
        },
        {
          path:'/publish',
          name:'publish',
          component:Publish
        },
        {
          path:'/image',
          name:'image',
          component:Image
        },
        {
          path:'/comment',
          name:'comment',
          component:Comment
        },
        {
          path:'/setting',
          name:'setting',
          component:Setting
        },
        {
          path:'/fans',
          name:'fans',
          component:Fans
        },
      ]
    },

]

const router = new VueRouter({
  routes
})

//设置路由守卫
router.beforeEach((to, from, next) => {
      //判断本地缓存中是否有user 
      //如果没有 则跳转登录界面
      //如果有 则跳转到首页
      const user =JSON.parse(window.localStorage.getItem('user'))
      //校验非登录界面的登录状态
      if(to.path!=='/login'){
         if(user){
            //已经登录，允许通过
            next()
         }else{
           //没有登录，跳转到登录界面
           next("/login")
         }
      }else{
        next();
      }
  
})
export default router
