<template>
    <div class="container">
        <div class="heade">
                <el-radio-group 
                    v-model="collect" 
                    size="mini"
                    @change="onChangebutton"
                >
                <el-radio-button :label="false">全部</el-radio-button>
                <el-radio-button :label="true">收藏</el-radio-button>
                </el-radio-group>
                <el-button 
                   size="mini"
                   type="success"
                   @click="dialogUploadeVisible=true"
                   v-if="isShowAdd"
                >添加素材</el-button>
            </div>

            <!-- 素材图片 -->
            <el-row :gutter="15">
                <el-col 
                    :xs="12" 
                    :sm="6" 
                    :md="6" 
                    :lg="4"
                    v-for="(img,index) in images"
                    :key="index"
                    class="image"
                    @click.native="selected=index"
                    >
                    <!-- 图片素材 -->
                    <el-image
                        style="height: 100px"
                        :src="img.url"
                        fit="cover"
                    >
                    </el-image>

                    <!-- 选中样式 -->
                    <div class="selceted" v-if="isShowSelected && selected===index"></div>

                    <!-- 底部操作区 -->
                    <div class="image-item" v-if="isShowDelet">
                        <i :class="{
                            'el-icon-star-on':img.is_collected,
                            'el-icon-star-off':!img.is_collected
                        }"
                        @click="onClick(img)"
                        ></i>
                        <i class="el-icon-delete" @click="ondelet(img)"></i>
                    </div>
                </el-col>
            </el-row>

            <el-dialog 
            title="上传素材" 
            :visible.sync="dialogUploadeVisible"
            :append-to-body=true
        >
            <el-upload
                class="upload-demo"
                drag
                action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
                :headers="uploadHeader"
                name="image"
                multiple
                :on-success="uploadSuccess"
                >
                <i class="el-icon-upload" @click="ondelet"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-dialog>

        <!-- 分页组件  
                 默认十条每页
            -->
            <el-pagination
                background
                layout="prev, pager, next"
                :total="totalCount"
                @current-change="currentPage"
                :page-size="pageSizes"
            />
    </div>
</template>
<script>
import {getmages,collectmages,deletmages} from '@/api/image'
export default {
    name:"ImageList",
    data () {
        const user =JSON.parse(window.localStorage.getItem('user'));
        return {
            collect: false,
            images:[] , //所有图片
            dialogUploadeVisible:false,
            uploadHeader:{
                Authorization:`Bearer ${user.token}`
            },
            totalCount:0, //总条数
            pageSizes:12,
            selected:null
        }          
    },
    created () {
        this.allImages();
    },
    props:{
        isShowAdd:{
            type:Boolean,  //设置布尔值
            default:true  //设置默认值
        },
        isShowDelet:{
            type:Boolean,  //设置布尔值
            default:true  //设置默认值
        },
        isShowSelected:{
            type:Boolean,  //设置布尔值
            default:false  //设置默认值
        }
    },
    methods: {
        allImages(page=1){
            getmages({
                collect:this.collect,
                page,
                per_page:this.pageSizes,
            }).then(res=>{
                console.log(res);
                this.images=res.data.data.results
                this.totalCount=res.data.data.total_count //数据总条数
            })
        },
        onChangebutton(){
            this.allImages(1)
        },
        uploadSuccess(){
             this.$message({
                message:"上传成功!",
                type:"success"
            })
            //关闭弹框
            this.dialogUploadeVisible=false

            //刷新页面
            this.allImages(page)
        },
        currentPage(page){
            this.allImages(page)
        },
        
        //收藏状态
        onClick(img){ 
            console.log(img)
            //则反
            collectmages(img.id,img.is_collected).then(res=>{
                console.log(res)
                if(img.is_collected){ //如果已收藏则取消收藏
                     img.is_collected=false
                     this.$message({
                         message:"取消收藏成功!",
                         type:"success",
                         duration:900
                     })
                }else{
                     img.is_collected=true
                     this.$message({
                         message:"收藏成功!",
                         type:"success",
                         duration:900
                     })
                }
            })
        },

        //删除状态
        ondelet(img){
            deletmages(img.id).then(res=>{
                this.$message({
                    message:"删除图片成功!",
                    type:"success",
                    duration:800
                })
                //重新刷新页面
                this.allImages(this.page)
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .heade{
        padding-bottom: 20px;
        display: flex;
        justify-content: space-between;
    }
    .image{
        position: relative;
    }
    .image-item{
        height:30px;
        background-color: rgba(19, 16, 16, 0.4);
        position:absolute;
        bottom: 4px;
        left: 7px;
        right: 7px;
        font-size: 17px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        color: #fff;
    }
    .el-image {
        width: 100%;
        position: relative;
        display: inline-block;
        overflow: hidden;
    } 
    .el-icon-star-on{
        color: orange;
    }
    .selceted{
        background: url("./selected.png") no-repeat;
        background-size: cover;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>