<template>
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="2"><div class="grid-content bg-purple">星巴克后台管理</div></el-col>
                    <el-col :span="20"><div class="grid-content bg-purple-light">1</div></el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple">
                            <el-button @click="handleConfirm" type="primary">退出</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <!--  -->
                    <my-aside :menuArr="menuArr"></my-aside>
                    <!--  -->
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

</template>

<script>
import MyAside from "../../components/MyAside.vue"
    export default {
        components:{MyAside},
        data(){
            return{
                menuArr:[
                    {
                        text:"数据分析",
                        icon:"el-icon-s-data",
                        path:'/dataanalysis'
                    },
                    {
                        text:"用户列表",
                        icon:"el-icon-s-check",
                        path:'/userlist'
                    },
                    {
                        text:"订单管理",
                        icon:"el-icon-folder",
                        path:'/orderlist'
                    },
                    {
                        text:"菜品管理",
                        icon:"el-icon-brush",
                        path:'/varietylist'
                    },
                    {
                        text:"员工管理",
                        icon:"el-icon-s-custom",
                        path:'',
                        children:[
                            {
                                text:"员工详情",
                                icon:"el-icon-brush",
                                path:'/userinfo'
                            },
                            {
                                text:"其他页面",
                                icon:"el-icon-brush",
                                path:'/notfound'
                            },
                        ]
                    },
                ]
                
            }
        },
        methods:{
            handleConfirm(){
                this.$store.commit('moduleUser/loginout')
                this.$router.push("/login")
            }
        }
    }
</script>

<style lang="scss" scoped>
        .el-container {
            height: 100%;
        }
        .el-header, .el-footer {
            background-color: #B3C0D1;
            color: #333;
            
        }
        
        .el-aside {
            background-color: #D3DCE6;
            color: #333;
            
        }
        
        .el-main {
            background-color: #E9EEF3;
            color: #333;
            
        }

        .el-row{
            line-height: 60px;
        }
        
        
        

</style>