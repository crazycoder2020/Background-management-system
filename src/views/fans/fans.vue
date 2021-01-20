<template>
    <div>
        <el-card class="filter-card" >
            <div slot="header" class="clearfix">
                <!-- 面包屑导航 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
                </el-breadcrumb>   
            </div>

            <div ref="main" style="width: 600px;height:400px;"></div>
        </el-card>    
    </div>
</template>

<script> 
var echarts = require('echarts');
export default {
    name:"Fans",
    data () {
        return {
            
        }
    },
    mounted(){
        var myChart = echarts.init(this.$refs.main);

        // 指定图表的配置项和数据
        var option = {
            tooltip: {},
            legend: {
                data:['活跃人数']
            },
            xAxis: {
                data: ["Mon","Tue","Wen","Thu","Fri","Sat","Sun"]
            },
            yAxis: {},
            series: [{
                name: '直接访问:',
                type: 'bar',
                data: [10, 50, 336, 520, 310, 200,300]
            }]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
    }
   
}
</script>
<style lang="less" scoped>

</style>