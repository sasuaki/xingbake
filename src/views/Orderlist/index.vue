<template>
    <div class="order">
       <div class="order_title">订单管理</div>
       <el-card>
            <!-- 查询 -->
            <el-row>
                <el-col :span="16">
                    <span class="label">交易时间</span>
                    <el-date-picker
                    v-model="order_value"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">

                    </el-date-picker>

                    <span class="zhuohao"></span>

                    <el-select v-model="zhuohao_value">
                        <el-option 
                        v-for="(item,index) in zhuohaoList" 
                        :key="index" 
                        :label="item.label" 
                        :value="item.value"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-button type="success" @click="filterList">查询</el-button>
                </el-col>
            </el-row>
            <!-- 表格 -->
            <div class="table">
                <el-table :data="orderData" border style="width:100%">
                    <el-table-column prop="order_time" label="交易时间"></el-table-column>
                    <el-table-column prop="table_number" label="桌号"></el-table-column>
                    <el-table-column prop="number_of_diners" label="用餐人数"></el-table-column>
                    <el-table-column label="菜品详情">
                        <template slot-scope="{row}">
                            <el-button @click="changeBox(row)">菜品详情</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sett_amount" label="交易金额"></el-table-column>
                    <el-table-column prop="transac_status" label="交易状态">
                        <template slot-scope="{row}">
                            <el-button size="mini" type="danger"
                            :class="row.transac_status==='success'?'btnColor':''">
                            {{
                                row.transac_status==='success'?'已结账':'未结账'
                            }}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
       </el-card>

       <!-- 详情弹框 -->
       <el-dialog :visible.sync="dialogVisible" title="详细菜单" width="300px">
            <div class="big_box" v-for="(item,index) in goodList" :key="index">
                <div class="title_name">第{{index+1}}次下单</div>
                <div class="as">
                    <div class="centent_box"
                    v-for="(ite,ind) in item.goods_list" :key="ind">
                        <div class="centent_left">{{ite.name}}</div>
                        <div class="centent">{{ite.good_specs}}</div>
                        <div class="centent_right">{{ite.quantity}}{{ite.unit}}</div>
                    </div>
                </div>
            </div>
       </el-dialog>


       <!-- 分页 -->
        <el-pagination
        :page-size="pageSize"
        :total="total"
        :page-sizes="[10,20]"
        layout="prev, pager, next, jumper,sizes,total"
        :current-page="orderGet.page"
        @current-change="changePageNum"
        @size-change="changeSize">
        </el-pagination>
    </div>
</template>

<script>
import {getTable,obtainorder,vieworder} from '../../api/user'

    export default {
        data(){
            return{
                order_value:[],
                zhuohaoList:[],
                zhuohao_value:"",
                orderData:[],
                orderGet:{
                    page:0, //当前页
                    table_number:"",
                    order_time:"[]"
                },
                dialogVisible:false,
                goodList:[],  //菜单详细数据

                pageSize:10, //页面条数
                total:0  //总数量
            }
        },
        mounted(){
            this.getTable(),
            this.getData()
        },
        methods:{
            async getTable(){
                let {data} = await getTable()
                // console.log(data,1)
                this.zhuohaoList=data
            },
            async getData(){
                let {data:{result,total}} = await obtainorder(this.orderGet)
                // console.log(result,2)
                this.orderData=result
                // total赋值
                this.total=total
                
            },
            filterList(){
                this.orderGet={
                    page:0,
                    table_number:this.zhuohao_value,
                    order_time:JSON.stringify(this.order_value)
                },
                this.getData()
            },
            // 点击菜品详情
            async changeBox(row){
                this.dialogVisible=true
                let {data:res}=await vieworder({id:row._id})
                // console.log(res,8);
                this.goodList=res
            },

            changePageNum(v){
                console.log(v,1)
                this.orderGet.page=v-1
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
 .order {
  .order_title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .el-date-editor {
    border: 0;
  }
  .zhuohao {
    margin: 0 10px;
  }
  // 表格
  .table {
    margin-top: 20px;
  }
  .btnColor {
    background-color: green;
    border: 0;
  }
  .title_name {
    font-weight: bold;
    font-size: 17px;
    padding-bottom: 10px;
  }
  .centent_box {
    display: flex;
    line-height: 30px;
    justify-content: space-between;
  }
  .el-dialog {
    width: 30%;
  }
  .namecas {
    margin-top: 20px;
  }
  .cidbox {
    width: 100%;
    .cidList {
      width: 100%;
      .cid_item {
        line-height: 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
}
</style>