<template>
    <div>
        <el-card class="filter-card" >
            <div slot="header" class="clearfix">
                <!-- 面包屑导航 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>评论管理</el-breadcrumb-item>
                </el-breadcrumb>   
            </div>
            
            <!-- 表格栏 -->
            <el-table
                :data="article"
                stripe
                style="width: 100%"
                class="table"
                >
                <el-table-column
                    prop="title"
                    label="标题"
                    width="180"
                    
                    >
                </el-table-column>
                <el-table-column
                    prop="total_comment_count"
                    label="总评论数"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="fans_comment_count"
                    label="粉丝评论数">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="状态">
                    <template slot-scope="scope">
                        {{scope.row.comment_status ? '正常' : '关闭'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="操作">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.comment_status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="changewswich(scope.row)"
                            :disabled="scope.row.statusDisable"
                            >
                        </el-switch>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页栏 -->
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="page"
                :page-sizes="[10, 20, 50, 100]"
                :page-size.sync="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
                background
                >
            </el-pagination>
        </el-card>    
    </div>
</template>
<script>
import {getUserArticles} from '@/api/article'
import {updateimage} from '@/api/comment'
export default {
    name:"CommentIndex",
    data () {
        return {
            article:[], //文章数据
            totalCount:null, //评论总数量
            pageSize:10, //每页多少条数据
            page:1
        }
    },
    created () {
        this.loadComment(1)
    },
    methods: {
        handleSizeChange() {
            this.loadComment(1)
        },
        handleCurrentChange(page) {
            this.loadComment(page)
        },

        //加载文章内容
        loadComment(page=1){
            this.page=page
            getUserArticles({
                response_type:'comment',
                page,
                per_page:this.pageSize
            }).then(res=>{
                console.log(res)
                const {results} =res.data.data
                results.forEach(article => {
                    article.statusDisable=false
                });
                this.article=results
                this.totalCount=res.data.data.total_count
            })
        },
        //修改文章状态
        changewswich(article){
            // console.log(article);
            article.statusDisable=true
            updateimage(article.id.toString(),article.comment_status).then(res=>{
                console.log(res)
                article.statusDisable=false
                this.$message({
                    message:article.comment_status ? '开启发布文章评论成功!' :'关闭发布文章评论成功!',
                    type:"success",
                    duration:900
                })
            });
           
        }
    }
}
</script>
<style lang="less" scoped>
    .table{
        margin-bottom: 20px;
    }
</style>    