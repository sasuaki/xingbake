<template>
    <div class="UserTable">
        <div class="table">
            <el-table 
            :data="userData"
            border 
            @selection-change="selectionChange">              
                <template slot="empty">
                    <el-emgty description="暂无数据" :image-size="100"></el-emgty>
                </template>

                <!-- 是否多选 -->
                <el-table-column 
                type="selection" 
                v-if="tableConfig.isCheckbox"></el-table-column>

                <!-- 是否需要序号 -->
                <el-table-column 
                type="index" 
                label="序号" 
                align="center" 
                v-if="tableConfig.isIndex"></el-table-column>





                <el-table-column
                v-for="column in tableConfig.thead"
                :key="column.key"
                :prop="column.key"
                :label="column.label"
                align="center"
                :min-width="column.minWidth">
                    <template slot-scope="{row}">
                        <!-- 图片展示 -->
                        <el-image 
                        v-if="column.image"
                        style="width:50px;height:50px;" 
                        :src="row[column.key]"
                        :preview-src-list="list"
                        lazy></el-image>


                        <!-- 菜品详情 -->
                        <el-button
                        v-else-if="column.isDesc" 
                        @click="column.callback&&column.callback(row)">
                            {{row[column.label]}}
                        </el-button>


                        <!-- switch开关 -->
                        <el-switch
                        v-else-if="column.switch"
                        v-model="row[column.key]"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="column.callback&&column.callback(row._id,row.quit)">
                        </el-switch>


                        <!-- 默认展示 -->
                        <span v-else>{{row[column.key]}}</span>
                    </template>

                </el-table-column>




                <!-- 操作 -->
                <el-table-column                
                :label="tableConfig.operation.label" 
                :width="tableConfig.operation.width"
                v-if="tableConfig.isOperation">
                    <template slot-scoped="{row}">
                        <!-- v-for和v-if不建议一起使用 -->
                        <template v-if="tableConfig.operation.cols">
                            <div 
                            class="btn" 
                            v-for="item in tableConfig.operation.cols"
                            :key="item.label">
                                <el-button 
                                @click="item.handleRow(row,item.label)"
                                :type="item.type">
                                    {{item.label}}
                                </el-button>
                            </div>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            // 表格头部配置
            tableConfig:{
                type:Object,
                default:()=>{}
            },
            // 表格数据
            userData:{
                type:Array,
                default:()=>{
                    return []
                }
            },
            
            
        },
        methods:{
            selectionChange(val){
                this.$emit('selectionChange',val)
            }
        }
    }
</script>

<style lang="scss" scoped>
.btn{
    display: flex;
    justify-content: center;
    display: inline-block;
    margin: 5px 0 0 5px;
}
</style>