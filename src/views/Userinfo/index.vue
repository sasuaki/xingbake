<template>
    <div class="user">
        <div class="user_title">员工详情</div>
        <el-row class="user_add">
            <el-col>
                <el-button 
                type="success"
                @click="addUser">添加员工</el-button>
                <el-button type="danger" @click="delUsers">批量删除</el-button>
            </el-col>
        </el-row>

        <!-- 表格 -->
        <div class="table">
            <my-table 
            :tableConfig="tableConfig" 
            :userData="userData" 
            :isTool="false"
            @selectionChange="handleSelectionChange"></my-table>


            <!-- <el-table 
            border 
            :data="userData"
            @selection-change="handleSelectionChange">              
                <el-table-column type="selection" ></el-table-column>
                <el-table-column prop="time" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="jobnumber" label="工号" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" align="center"></el-table-column>
                <el-table-column prop="position" label="职业" align="center"></el-table-column>
                <el-table-column prop="address" label="是否离职" align="center">
                    <template slot-scope="{row}"> 
                        <el-switch
                        v-model="row.quit"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="changeState(row._id,row.quit)">
                        </el-switch>
                    </template>
                </el-table-column>
            </el-table> -->
        </div>

        <!-- 弹框 -->
        <el-dialog :visible.sync="dialogVisible">
            <el-form ref="form" :model="userForm" label-width="80px">
                <el-form-item label="工号">
                    <el-input v-model="userForm.jobnumber"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="userForm.sex" label="001">男</el-radio>
                    <el-radio v-model="userForm.sex" label="002">女</el-radio>
                </el-form-item>
                <el-form-item label="职位">
                    <el-input v-model="userForm.position"></el-input>
                </el-form-item>
                <el-form-item label="是否离职">
                    <el-radio v-model="userForm.quit" label="001">在职</el-radio>
                    <el-radio v-model="userForm.quit" label="002">已离职</el-radio>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="add">确定</el-button>
                    <el-button type="danger">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {getemployees,modifyresi,addem,deleteemp} from "../../api/user"
import MyTable from "@/components/MyTable.vue"
    export default {
        components:{MyTable},
        data(){
            return{
                userData:[],
                pageNum:0,
                pageSize:10,
                total:0,
                dialogVisible:false,  //控制弹框的显示隐藏
                userForm:{
                    jobnumber:"",
                    name:"",
                    sex:"",
                    position:"",
                    quit:""
                },
                // 删除id
                delete:[],

                // 表格列配置
                tableConfig:{
                    thead:[
                    {
                        label:"创建时间",
                        key:"time",
                        minWidth:"100px"
                    },
                    {
                        label:"工号",
                        key:"jobnumber",
                        minWidth:"100px"
                    },
                    {
                        label:"姓名",
                        key:"name",
                        minWidth:"100px"
                    },
                    {
                        label:"性别",
                        key:"sex",
                        minWidth:"100px"
                    },
                    {
                        label:"职位",
                        key:"position",
                        minWidth:"100px"
                    },
                    {
                        label:"是否离职",
                        key:"quit",
                        minWidth:"100px",
                        switch:true,
                        callback:async (rowData)=>{
                            // console.log(rowData,0);
                            let {msg} = await modifyresi({id:rowData._id,quit:rowData.quit})
                            this.$message.success(msg)
                        }
                    },

                ],
                    isCheckbox:true,   //是否多选
                    isIndex:false,    //是否有序号
                    isOperation:false,   //是否有操作列
                    operation:{
                        label:"操作",
                        width:"200",
                        cols:[
                            {
                                label:"编辑",
                                type:"primary",
                                handleRow:this.handleRow
                            },
                            {
                                label:"下架",
                                type:"danger",
                                handleRow:this.handleRow
                            }
                        ]
                },
                }
            }
        },
        created(){
            this.getData()
        },
        methods:{
            // 操作的方法
            handleRow(rowData,label){
                
            },
            async getData(){
                let {data:{result,total}} = await getemployees({page:this.pageNum})
                // console.log(res,1)
                // 数据渲染
                this.userData=result
                // total赋值
                this.total=total
            },
            async changeState(id,quit){
                let {msg}= await modifyresi({id,quit})
                // console.log(res,"123");
                this.$message.success(msg)
            },
            // 点击添加员工
            addUser(){
                this.dialogVisible=true
            },
            async add(){
                //  console.log(this.userForm);
                await addem(this.userForm)
                this.$message.success("添加成功")
                this.dialogVisible=false
                // 赋初始值
                this.userForm={
                    jobnumber:"",
                    name:"",
                    sex:"",
                    position:"",
                    quit:""
                }
                // 重新渲染
                this.getData()
            },
            handleSelectionChange(val){
                // console.log(event,"event");
                this.delete=val.map(item=>item._id)
            },
            delUsers(){
               if(this.delete.length<=0){
                    return this.$message.success("请选择要删除的元素")
                    }
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async () => {
                        await deleteemp({arrayid:this.delete})
                        this.getData()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
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

<style lang="scss" scoped>
.user_add{
    margin-top: 25px;
    margin-bottom: 20px;
}
</style>