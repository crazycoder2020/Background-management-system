<template>
    <div>
        <el-card class="filter-card" >
            <div slot="header" class="clearfix">
                <!-- 面包屑导航 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{$route.query.id?'修改文章' :'发布文章'}}</el-breadcrumb-item>
                </el-breadcrumb>   
            </div>
            <el-form ref="form" :model="article" label-width="60px" :rules="formrules">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="article.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-tiptap  
                        v-model="article.content" 
                        :extensions="extensions"
                        height="250"
                        placeholder="请输入文章内容">
                    </el-tiptap>
                </el-form-item>
                <el-form-item label="封面">
                    <el-radio-group v-model="article.cover.type">
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                    </el-radio-group>
                    <template v-if="article.cover.type>0">
                        <Cover
                            v-for="(cover,index) in article.cover.type"
                            :key="index"
                            v-model="article.cover.images[index]"
                        />
                    </template>
                   
                </el-form-item>
                <el-form-item label="频道" prop="channel_id">
                    <el-select v-model="article.channel_id" placeholder="请选择活动区域">
                        <el-option 
                            v-for="(channels,index) in articleChannel"
                            :key="index"
                            :label="channels.name" 
                            :value="channels.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onPubulish(false)">
                        {{$route.query.id?'修改' :'发布'}}
                    </el-button>
                    <el-button @click="onPubulish(true)">存入草稿</el-button>
                </el-form-item>
                </el-form>
        </el-card>    
    </div>
</template>
<script>
import 'element-tiptap/lib/index.css'
import Cover from './component/cover'
import {getUserChannel,addArticle,getArticle,updateArticle} from '@/api/article'


import {
  ElementTiptap,
  // 需要的 extensions
  Doc,
  Text,
  Image,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
} from 'element-tiptap';
import {uploadimage} from '@/api/image'
export default {
    name:"Publish",
    data () {
        return {
            articleChannel:[], //文章频道
            article:{
                title:"",   //文章标题
                content:"", //文章内容
                cover:{
                    type:1, //文章封面类型 -1：自动  0：无图  1：一张  3：三张
                    images:[]  //文章封面图片
                },
                channel_id:null //频道id 
            },
             extensions: [
                new Doc(),
                new Text(),
                new Paragraph(),
                new Heading({ level: 5 }),
                new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
                new Image({ 
                    //自定义上传图片格式
                    uploadRequest(file){
                        const fd =new FormData();
                        fd.append('image',file);
                        return uploadimage(fd).then(res=>{
                            return res.data.data.url
                        })
                    }
                }),
                new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
                new Italic(),
                new Strike(),
                new ListItem(),
                new BulletList(),
                new OrderedList(),
            ],
            formrules:{
                title:[
                    { required: true, message: '请输入标题名称', trigger: 'blur' },
                    { min: 5, max: 30, message: '长度在 5 到 30个字符', trigger: 'blur' }
                ],
                channel_id:[
                    { required: true, message: '请选择频道' }
                ]
            }
        }
    },
    components:{
        Cover
    },
    created () {
        this.getchannel();

        //因为发布和修改都是一个组件页面 所以这里要判断 有id则编辑文章
        if(this.$route.query.id){
            this.loadArticle()
        }
    },
    components: {
        Cover
    },
    methods: {
        //获取频道数据
        getchannel(){
            getUserChannel().then(res=>{
                // console.log(res)
                this.articleChannel=res.data.data.channels
            })
        },

        onPubulish(draft=false){
            //判断id是修改则显示修改界面  否则是发表页面
            const articleId =this.$route.query.id;
            if(articleId){
                updateArticle(articleId,this.article,draft).then(res=>{
                    console.log(res)
                    this.$message({
                        message:"修改成功!",
                        type:"success"
                    })
                    this.$router.push('/article')
                })
            }else{
                addArticle(this.article,draft).then(res=>{
                console.log(res)
                this.$message({
                    message:"发布成功!",
                    type:"success"
                });
                this.$router.push('/article')
             });
            }
        },

        //修改文章加载文章内容
        loadArticle(){
                // console.log('loadArticle')
            getArticle(this.$route.query.id).then(res=>{
                // console.log(res)
                this.article=res.data.data
            })
        },
    }
}
</script>
<style lang="less" scoped>

</style>