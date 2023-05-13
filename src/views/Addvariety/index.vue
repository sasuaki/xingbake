<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/varietylist'}">菜品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加菜品</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-form 
            v-model="varietyObj" 
            ref="varietyRef" 
            label-width="100px"
            class="demo-ruleform">
                <!-- 菜品类目 -->
                <el-form-item label="菜品类目">
                    <el-select v-model="varietyObj.category">
                        <el-option 
                        v-for="item in cates"
                        :key="item._id"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="菜品名称" >
                    <el-input v-model="varietyObj.name"></el-input>
                </el-form-item>

                <el-form-item label="菜品价格">
                    <el-input 
                    v-model="varietyObj.unitprice"
                    class="el-input"></el-input>
                    <el-select v-model="varietyObj.unit">
                        <el-option
                        v-for="ite in units"
                        :key="ite._id"
                        :label="ite.label"
                        :value="ite.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="菜品图片">
                    <el-upload
                    :action="upLoadUrl"
                    list-type="picture-card"
                    :headers="headerObj"
                    name="file"
                    :file-list="varietyObj.image"
                    :on-success="changeFile"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item>
                    <el-button @click="submitForm">立即创建</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { obtaincate,obtainunit,putdishes,editdishes  } from '@/api/user'
import axios from 'axios'
import { getToken } from '@/utils/storage'

    export default {
        data(){
            return{
                varietyObj:{
                    category:"",
                    name:"",
                    unitprice:0,
                    unit:"",
                    image:[],
                    _id:""
                },
                cates:[],
                units:[],
                // 上传图片的地址
                upLoadUrl:"https://meituan.thexxdd.cn/apit/uploadres",
                headerObj:{
                    Authorization:getToken()
                }
            }
        },
        mounted(){
            
            // 接收编辑传送的数据
            if(this.$route.query.row){
                this.varietyObj=JSON.parse(this.$route.query.row,"row")
            }
            
            this.getCateAndUnit()
        },
        methods:{
            // axios.all执行并发请求，接收数组为参数，返回一个promise对象，数组中所有请求均已完成，执行then方法
            // axios.spread接收一个函数作为参数，返回一个新的函数，接收的参数函数的参数是axios.all方法中每个请求返回的响应
            async getCateAndUnit(){
                axios.all([obtaincate(),obtainunit()])
                .then(axios.spread((cate,unit)=>{
                    // console.log(cate,0)
                    // console.log(unit,8)
                    this.cates=cate.data
                    this.units=unit.data
                }))
            },

            changeFile(response,file,filelist){
                console.log(response,file,filelist,"1");
                // response把图片上传后的路径响应回来
                let {data,msg} = response
                this.$message.success(msg)
                let objImg={
                    url:data,
                    uid:file.uid
                }
                this.varietyObj.image.push(objImg)
            },
            // 菜品添加/编辑
            async submitForm(){
                if(this.varietyObj._id===""){
                    // 添加
                    let res=await putdishes(this.varietyObj)
                    // console.log(res,9)
                    this.$router.push("/varietylist")
                }else{
                    // 编辑
                    let res=await editdishes(this.varietyObj)
                    // console.log(res,9)
                    this.$router.push("/varietylist")
                }
                
            }
            
        }

    }
</script>

<style lang="scss" scoped>
    .el-input{
        width: 200px;
        margin-right: 10px;
    }
</style>