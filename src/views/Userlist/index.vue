<template>
    <div class="user">
        <div class="user_title">用户列表</div>
        <div class="table">
            <el-table border :data="userData">
                <el-table-column prop="time" label="注册时间"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="head" label="头像">
                    <template slot-scope="{ row }">
                        <el-image 
                        style="width:50px;height:50px;" 
                        :src="row.head"
                        :preview-src-list="list"
                        lazy></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="position" label="职业"></el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
            :page-size="pageSize"
            :total="total"
            :page-sizes="[10,20,30]"
            layout="prev, pager, next, jumper,sizes, total"
            :current-page="pageNum"
            @current-change="changePageNum"
            @size-change="changeSize">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {pulluserlist} from '../../api/user'
    export default {
        data(){
            return{
                userData:[],
                pageNum:0, //当前页
                pageSize:10,  //每页条数
                total:0,  //总数量
                list:[]
                
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            async getData(){
                let res = await pulluserlist({page:this.pageNum})
                console.log(res,6);
                //result是该页的数据   total总数量
                let {data:{result,total}}=res
                // 数据渲染
                this.userData=result
                // total赋值
                this.total=total
                // 给预览图片的数组赋值
                this.list=result.map(item=>item.head)
            },
            changePageNum(v){
                console.log(v,233)
                this.pageNum=v-1
                this.getData()
            },
            changeSize(v){
                console.log(v,244)
                this.pageSize=v
                this.getData()
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>