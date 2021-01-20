<template>
    <div class="container">
        <el-card class="filter-card" >
            <div slot="header" class="clearfix">
                <!-- 面包屑导航 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                </el-breadcrumb>   
            </div>
            <!-- 数据筛选列表 -->
            <el-form ref="form" :model="form" label-width="40px" size="mini">
                <el-form-item label="状态">
                    <el-radio-group v-model="status">
                    <el-radio :label="null">全部</el-radio>
                    <el-radio :label="0">草稿</el-radio>
                    <el-radio :label="1">待审核</el-radio>
                    <el-radio :label="2">审核通过</el-radio>
                    <el-radio :label="3">审核失败</el-radio>
                    <el-radio :label="4">已删除</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="频道">
                    <el-select v-model="channelsId" placeholder="请选择">
                    <el-option 
                        label="全部"
                        :value="null"
                    ></el-option>
                    <el-option 
                        :label="channel.name"
                        :value="channel.id"
                        v-for="(channel,index) in channel"
                        :key="index"
                    ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="日期">
                    <el-date-picker
                        v-model="rangeDate"
                        type="datetimerange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00']"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                    />
                </el-form-item>

                <el-form-item>
                    <el-button 
                       type="primary"
                       :disabled="loading"
                       @click="LoadArticles(1)"
                       >
                    查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        
        <el-card class="box-card">
             <div slot="header" class="clearfix">
               根据筛选条件共查询到 {{totalCount}} 条结果:
            </div>
            <!-- 表格部分 -->
            <el-table
                :data="article"
                stripe
                style="width: 100%"
                class="list-table"
                size="mini"
                v-loading="loading"
            >
                <el-table-column
                    prop="image"
                    label="封面"
                >
                    <template slot-scope="scope">
                        <el-image
                            style="width:100px;height:50px"
                            :src="scope.row.cover.images[0]"
                            fit="cover"
                            lazy
                        >
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="标题"
                >
                </el-table-column>
                <el-table-column
                    prop="articleStates"
                    label="状态">
                    <template slot-scope="scope">
                        <el-tag :type="articleStates[scope.row.status].type">
                            {{articleStates[scope.row.status].text}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="pubdate"
                    label="发布时间">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary" 
                            icon="el-icon-edit" 
                            circle
                            @click="$router.push('/publish?id='+scope.row.id.toString())"
                        >
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete" 
                            circle
                            @click="deletarticle(scope.row.id)"
                        >
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页组件  
                 默认十条每页
            -->
            <el-pagination
                background
                layout="prev, pager, next"
                :total="totalCount"
                @current-change="currentPage"
                :page-size="pageSizes"
                class="right"
                :disabled="loading"
                />

        </el-card>
    </div>
</template>
<script>
import {getUserArticles ,getUserChannel,deletArticle} from '@/api/article.js'
export default {
    name:'ArticleIndex',
    data () {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            article:[], //文章数据列表
            articleStates:[
                {status:0,text:"草稿",type:"info"},
                {status:1,text:"待审核",type:""},
                {status:2,text:"审核通过",type:"success"},
                {status:3,text:"审核失败",type:"danger"},
                {status:4,text:"已删除",type:"warning"},
            ],
            totalCount:0, //总数据条数
            pageSizes:10,  //支持显示条目个数
            status:null,   //查询文章状态 默认全部
            channel:[],    //文章频道列表
            channelsId:null, //查询文章频道
            rangeDate:null,    //选择开始日期以及结束日期 
            loading:true ,    //请求数据页面加载状态
        }
    },
    //创建页面时渲染
    created () {
       this.LoadArticles(1);
       this.LoadChannel();
    },
    methods: {
        //请求文章数据
        LoadArticles(page = 1){
            this.loading=true;
          getUserArticles({
              page,
              per_page:this.pageSizes,
              status:this.status,
              channel_id:this.channelsId,
              begin_pubdate:this.rangeDate ? this.rangeDate[0] : null, //开始日期
              end_pubdate: this.rangeDate ? this.rangeDate[1] : null   //结束日期
          }).then(res=>{
            //console.log(res)
            const {results,total_count:totalCount} =res.data.data //代码解构

            this.article=results //文章数据

            this.totalCount=totalCount //数据总条数

            //请求结束关闭loading
            this.loading=false
           })
        },

        //点击分页
        currentPage(page){
            this.LoadArticles(page);
        },
        
        //获取文章频道数据
        LoadChannel(){
            getUserChannel().then(res=>{
                //console.log(res)
                this.channel=res.data.data.channels
            })
        },

        //请求删除方法数据
        deletarticle(deletArticleId){
            this.$confirm('确认删除吗?', '退出提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            deletArticle(deletArticleId.toString()).then(res=>{
                //console.log(deletArticleId.toString())
                this.LoadArticles(this.page)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        }
    }
}
</script>
<style lang="less" scoped>
    .filter-card{
        margin-bottom:20px;
    }
    .list-table{
        margin-bottom: 20px;
    }
    .article-img{
        width:100px;
        background-size: cover;
    }
    .right{
        text-align: center;
    }
</style>