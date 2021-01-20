<template>
    <div>
        <el-card class="filter-card" >
            <div slot="header" class="clearfix">
                <!-- 面包屑导航 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>素材管理</el-breadcrumb-item>
                </el-breadcrumb>   
            </div>
            <imageList/>
        </el-card>
    </div>
</template>
<script>
import imageList from '@/components/imageList'
export default {
    name:"imageIndex",
    data () {
        return {
            
        }
    },
    components: {
        imageList
    }
}
</script>
<style lang="less" scoped>

</style>