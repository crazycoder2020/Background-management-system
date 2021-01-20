<template>
    <el-container class="layout-container">
        <el-aside width="200px" class="aside">
            <Aside class="left"/>
        </el-aside>
        <el-container>
            <el-header class="header">
                <div>
                  <i class="el-icon-s-fold"></i>
                  <span>新闻文章后台管理系统</span>
                </div>
                <el-dropdown>
                    <div class="right">
                         <img :src="user.photo" alt="">
                         <span>{{user.name}}</span>
                         <i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人设置</el-dropdown-item>
                        <el-dropdown-item 
                        @click.native="loginout"
                        >用户退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main class="main">
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import Aside from './components/aside'
import {getUserProfile} from '@/api/user.js'
import globalBus from '@/utils/global-bus'



export default {
    name:'Layout',
    data () {
        return {
            user:{}
        }
    },
    components: {
        Aside
    },
    //初始化的时候请求加载数据
    created () {
        this.LoadUserProfile(),
        //注册自定义事件
        globalBus.$on('update-user',(data)=>{
            this.user.name=data.name
            this.user.photo=data.photo
        })
    },
    methods: {
        //请求用户基本信息数据
        LoadUserProfile(){
           getUserProfile().then(res=>{
               //console.log(res)
               this.user=res.data.data
           }) 
        },
        loginout(){
          this.$confirm('确认退出吗?', '退出提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //清除本地存储的数据
           window.localStorage.removeItem('user');

           //跳转到登录界面
           this.$router.push('/login');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
        }
    }
}
</script>
<style lang="less" scoped>
    .layout-container{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }
    .left{
        height: 100%;
    }
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
    }
    .right{
        display: flex;
        align-items: center;
    }
    .right img{
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 10px;
    }

</style>