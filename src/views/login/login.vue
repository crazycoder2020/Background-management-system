<template>
    <div class="login-container">
        <el-form 
          ref="user" 
          :model="user" 
          class="center" 
          :rules="formRules"
          >
            <el-form-item>
                <img src="./logo_index.png" alt="">
            </el-form-item>
            <el-form-item prop="mobile">
                <el-input v-model="user.mobile" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="user.code"  placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onLogin" class="login" :loading="Loding">登录</el-button>
            </el-form-item> 
        </el-form>
    </div>
</template>

<script>
import {login} from '@/api/user'
export default {
    name:'Login',
    data () {
        return {
            user: {
            mobile: '13911111111',  //手机号dc
            code: '246810',    //验证码
            },
            checked: false, //勾选协议
            Loding:false,   //登录等待缓冲

           //表单验证规则
           formRules:{
               mobile:[
                   { required: true, message: "手机号不能为空!", trigger: 'blur' },
                   { pattern: /^1[3|5|7|8|9]\d{9}$/, message: "请输入正确的手机号!", trigger: 'blur' }
               ],
               code:[
                   { required: true, message: "验证码不能为空!", trigger: 'change' },
                   { pattern: /^\d{6}$/, message: "请输入正确的验证码!" ,trigger: 'change' }
               ]
           }
        }
    },
    methods: {
        onLogin(){
            //表单验证
            this.Loding=true;
            //发送数据请求，提交登录
            login(this.user).then(res=>{
                //console.log(res);
                if(this.checked===false){
                    this.$message.error("请勾选相关协议!");
                    this.Loding=false;
                }else{
                    //登录成功
                    this.$message({
                       message: '登录成功!',
                       type: 'success'
                    });
                this.Loding=false;

                //将接口返回的用户数据放到本地存储，方便应用
                window.localStorage.setItem('user',JSON.stringify(res.data.data));

                //登录成功，跳转到首页    
                this.$router.push({
                    name:'home'
                });
                }

                //登录失败
            }).catch(err=>{
                console.log("登录失败!",err);
                this.$message.error("登录失败,手机号或验证码不正确!");
                this.Loding=false;
            });
        }
    }
}
</script>

<style lang="less" scoped>
    .login-container{
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: url("./login_bg.jpg") no-repeat;
            background-size:cover;
            display: flex;
            justify-content: center;
            align-items: center;
    }
    .center{
        min-width: 300px;
        background-color: #fff;
        padding: 30px 30px 10px 30px;
    }
    .login{
        width: 100%;
    }
</style>