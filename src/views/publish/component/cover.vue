<template>
    <div class="container" @click="uploadCover">
        <div class="container-cover">
            <img
                ref="cover-img"
                class="cover-img"
                :src="value"
            >
        </div>   
            <el-dialog
                title="选择封面"
                :visible.sync="dialogVisible"
                append-to-body
                >
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="素材库" name="first">
                        <imageList
                            :isShowAdd="false"
                            :isShowDelet="false"
                            isShowSelected
                            ref="imageList"
                        />
                    </el-tab-pane>
                    <el-tab-pane label="上传图片" name="second">
                        <input 
                            type="file" 
                            ref="files"
                            @change="onChangeimage" 
                        >
                        <img 
                          ref="image"
                          width="100px"
                        />
                    </el-tab-pane>
                </el-tabs>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button 
                       type="primary" 
                       @click="onCoverComfirm"     
                    >确 定</el-button>
                </span>
            </el-dialog>
         
    </div>
</template>
<script>
import {uploadimage} from '@/api/image'
import imageList from '@/components/imageList'
export default {
    name:"Cover",
    data () {
        return {
            dialogVisible:false,
            activeName:"second"
        }
    },
    props:["value"],
    components: {
        imageList
    },
    methods: {
        uploadCover(){
            this.dialogVisible=true
        },
        onChangeimage(){
            const file =this.$refs.files
            const blob=window.URL.createObjectURL(file.files[0])
            this.$refs["image"].src=blob

            //防止上传两次相同图片不显示的问题
            // this.$refs.files.value=""
        },
        onCoverComfirm(){
            if(this.activeName==='second'){
                const file=this.$refs.files.files[0]
                if(!file){
                    this.$message({
                        message:"请上传文件!",
                        type:"danger"
                    })
                    return
                }

                //添加封面
                const fd =new FormData()
                fd.append("image",file)
                uploadimage(fd).then(res=>{
                    //关闭弹出层
                    this.dialogVisible=false
                    //上传图片
                    this.$refs["cover-img"].src=res.data.data.url

                    //将图片地址发送给父组件
                    this.$emit("input",res.data.data.url)
                })

            }else if(this.activeName==='first'){
                const imageList = this.$refs['imageList']
                const selected = imageList.selected
                console.log(selected)
                if(selected===null){
                    this.$message("请选择封面!")
                    return
                }
                //关闭对话框
                this.dialogVisible=false
                //修改父组件绑定数据
                this.$emit("input",imageList.images[selected].url)
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .container-cover{
        width: 150px;
        height: 120px;
        border: 1px solid #000;
        display: flex;
    }
    .cover-img{
        width: 150px;
        height: 120px;
        background-size: cover;
        display: flex;
    }
</style>