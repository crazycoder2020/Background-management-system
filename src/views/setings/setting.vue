<template>
    <div>
        <el-card class="filter-card" >
            <div slot="header" class="clearfix">
                <!-- 面包屑导航 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>个人设置</el-breadcrumb-item>
                </el-breadcrumb>   
            </div>

            <el-col :span="15">
                <el-form ref="user" :model="user" label-width="80px">
                <el-form-item label="编号">
                    {{user.id}}
                </el-form-item>
                <el-form-item label="手机">
                    {{user.mobile}}
                </el-form-item>
                <el-form-item label="媒体名称">
                    <el-input v-model="user.name"></el-input>
                </el-form-item>
                <el-form-item label="媒体介绍">
                    <el-input type="textarea" v-model="user.intro"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="user.email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button 
                       type="primary" 
                       @click="onSubmit"
                       :loading="updateProfile"
                       >保存</el-button>
                </el-form-item>
              </el-form>
            </el-col>

            <el-col :offset="2" :span="4">
                <el-image
                    shape="square"
                    style="width: 200px; height: 200px;margin-left:10px;margin-top:20px"
                    :src="user.photo"
                    fit="cover"
                    >
                </el-image>
                <p @click="$refs.file.click()">
                    点击修改头像
                </p>
                <input type="file" hidden ref="file" @change="fileChange"/>
            </el-col>

            <el-dialog
                title="修改头像"
                :visible.sync="dialogVisible"
                append-to-body
                width="30%"
                @opened="dialogChange"
                >
                <div class="preview-image-container">
                    <img 
                       :src="previwimage" 
                       alt=""
                       class="preview-image"
                       ref="preview-image"
                    >
                </div>
                
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button 
                       type="primary" 
                       @click="OnuploadPhoto"
                       :loading="updateLoding"
                       >确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import {getUserProfile ,uploadUserPhoto,uploadUserProfile} from '@/api/user'
import globalBus from '@/utils/global-bus'
export default {
    name:"Setting",
    data () {
        return {
            user:{
                id:null,
                email:'',
                name:'',
                intro:'',
                photo:'',
                mobile:''
            },
            dialogVisible: false,
            previwimage:'',
            cropper:null, //初始化裁截器
            updateLoding:false,
            updateProfile:false
        }
    },
    created () {
        this.loadeuser()
    },
    methods: {
      onSubmit() {
        //表单验证

        this.updateProfile=true
        //提交修改信息
        const {name,intro,email} =this.user
        uploadUserProfile({
            name,
            intro,
            email
        }).then(res=>{
            console.log(res)
            this.$message({
                message:"修改成功!",
                type:"success"
            })

            this.updateProfile=false

            //发布通知用户信息已修改
            globalBus.$emit('update-user',this.user)
        })
      },
      loadeuser(){
          getUserProfile().then(res=>{
              console.log(res)
              this.user=res.data.data
          })
      },

      fileChange(){
        //获取预览图片
        const file=this.$refs.file;
        const DateUrl=window.URL.createObjectURL(file.files[0]);
        this.previwimage=DateUrl

        //展示弹出层预览图片
        this.dialogVisible=true

        //解决选择相同的文件不触发change事件
        this.$refs.file.value=''
      },

      dialogChange(){
        const image =this.$refs['preview-image']

        if(this.cropper){
            this.cropper.replace(this.previwimage)
            return
        }
        //裁截器初始化
        this.cropper = new Cropper(image, {
            aspectRatio: 1,//剪裁比例
            viewMode:1,
            dragMode:"none",
            cropBoxResizable:false
        });
      },

      //点击确定
      OnuploadPhoto(){
          this.updateLoding=true
          //获取裁剪图片
          this.cropper.getCroppedCanvas().toBlob(file=>{
              const fd =new FormData()
              fd.append("photo",file)

              //请求更新用户头像
              uploadUserPhoto(fd).then(res=>{
                  console.log(res)
                  //关闭对话框
                  this.dialogVisible=false
                  //更新视图
                  this.user.photo=res.data.data.photo
                  
                  this.updateLoding=false

                  //传递更新过的图片
                  globalBus.$emit("update-user",this.user)
            })
          })
          
          //更新视图展示
      }
    }
  }
</script>

    }
}
</script>
<style lang="less" scoped>
    .preview-image-container{
        .preview-image{
            display: block;
            max-width: 100%;
            height: 200px;
        }
    }
</style>