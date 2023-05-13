<template>
    <div class="login-page">
        <el-card class="el-card">
            <template #header>星巴克后台系统</template>
            <el-form label-width="80px" :model="form" :rules="rules" ref="form">
                <el-form-item label="用户名" prop="username">
                    <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input placeholder="请输入密码" v-model="form.password"></el-input>
                </el-form-item>
                <!-- <el-form-item label="确认密码" prop="password1">
                    <el-input placeholder="请输入密码" v-model="form.password1"></el-input>
                </el-form-item> -->
                <el-form-item >
                    <el-button type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {login} from "../../api/user"
    export default {
        data(){

            // var validatePass2 = (rule,value,callback)=>{
            //     if(value.length===0){
            //         return callback(new Error("密码不能为空"))
            //     }else if(value!=this.form.password){
            //         return callback(new Error("两次密码不一致"))
            //     }
            // }

            return{
                form:{
                    username:"17600000000",
                    password:"s123456",
                    password1:""
                },
                rules:{
                    username:[
                        {required:true,message:"请输入用户名",trigger:['blur']},
                        {min:5,max:11,message:"长度在5到11个字符",trigger:['blur']}
                    ],
                    password:[
                        {required:true,message:"请输入密码",trigger:['blur']},
                        {pattern:/^\w{5,11}/,message:"请输入5到11位的密码",trigger:['blur']}
                    ],
                //     password1:[
                //         {validator:validatePass2,trigger:'blur'}
                //     ]
                }
            }
        },
        methods:{
            async login(){
                // 校验
               try{
                const valid =await this.$refs.form.validate()
                // console.log(valid,0)
                if(valid){
                    // 实现登录请求
                    const {data:{token}} = await login(this.form)
                    // console.log(res)
                    // 把token存储到本地和vuex
                    this.$store.commit("moduleUser/setUserToken",token)
                    // 存储用户信息this.form
                    this.$store.commit("moduleUser/setUserInfo",this.form)
                    // 跳转到首页
                    this.$router.push('/')
                }
               }catch(e){
                console.log(e,7);
               }
            }
        }
    }
</script>

<style lang="scss" scoped>
.login-page{
    height: 100%;
    position: relative;
    background-color: pink;
}

.el-card{
    position: absolute;
    width: 420px;
    height: 280px;
    margin: auto;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    ::v-deep .el-card__header{
        line-height: 40px;
        text-align: center;
    }

}
</style>