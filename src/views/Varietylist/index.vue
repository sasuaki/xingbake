<template>
    <div class="variety">
        <div class="variety_title">菜品管理</div>
        <el-button 
        class="add-variety" 
        type="success"
        @click="$router.push('/addvariety')" >添加菜品</el-button>
        <!-- 表格 -->
        <div class="table">
            <el-table border :data="varietyData" style="width:100%">
                <el-table-column prop="time" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="category" label="类目" align="center"></el-table-column>
                <el-table-column prop="name" label="菜品名称" align="center"></el-table-column>
                <el-table-column prop="image" label="商品图片" align="center">
                    <template slot-scope="{row}">
                        <div v-if="row.image instanceof Array">
                            <el-image
                            
                            v-for="item in row.image"
                            :key="item.uid"
                            style="width:60px;height:60px"
                            :src="item.url"
                            :preview-src-list="list"
                            lazy></el-image>
                        </div>
                        
                        <img
                        v-else
                        style="width:50px;height:50px"
                        :src="row.image"
                        v-imageerror="require('@/assets/logo.png')">

                    </template>
                </el-table-column>
                <el-table-column prop="unitprice" label="价格" align="center"></el-table-column>
                <el-table-column  label="操作" align="center">
                    <template slot-scope="{row}">
                        <el-button 
                        type="primary"
                        @click="handleEdit(row)">编辑</el-button>
                        <el-button 
                        type="danger"
                        :disabled="row.onsale? false:true">{{row.onsale?'下架':'已下架'}}</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination
            :page-size="pageSize"
            :total="total"
            :page-sizes="[10,20,30,40,50]"
            layout="prev, pager, next, jumper,sizes, total"
            :current-page="pageNum"
            @current-change="changePageNum"
            @size-change="changeSize">

            </el-pagination>
        </div>
    </div>
</template>

<script>
import {obtaindishes} from '../../api/user'
    export default {
        data(){
            return{
                varietyData:[],
                pageNum:0,
                pageSize:10,
                total:0,
                list:[]
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            async getData(){
                let {data:{result,total}} = await obtaindishes({page:this.pageNum})
                console.log(result,1);
                // 数据渲染
                this.varietyData=result
                // total赋值
                this.total=total
                // 预览图片数组赋值
                this.list=result.map(item=>item.image)
            },
            changePageNum(v){
                this.pageNum=v-1
                this.getData()
            },
            changeSize(v){
                this.pageSize=v
                this.getData()
            },

            handleEdit(row){
                let item = JSON.stringify(row)
                this.$router.push(`/addvariety?row=${item}`)
            }

        }
    }
</script>

<style lang="scss" scoped>
.variety{
    position: relative;
    .add-variety{
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .table{
        margin-top: 40px;

        
    }
}
</style>