<template>
    <div>
        <el-menu
            default-active="/dataanalysis"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            router
            active-text-color="#ffd04b">
            <template v-for="(item,index) in menuArr" >
                <el-menu-item v-if ="!item.children" :key="index" :index="item.path" >
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.text}}</span>
                </el-menu-item>
                <el-submenu v-else :key="index" :index="item.path" >
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span >{{item.text}}</span>
                    </template>
                    <el-menu-item  v-for="(ite,ind) in item.children" :key="ind" :index="ite.path">
                        <span slot="title">{{ite.text}}</span>
                    </el-menu-item>
                </el-submenu>
            </template>                   
        </el-menu>
    </div>
</template>

<script>
    export default {
        props:{
            menuArr:{
                type:Array,
                default:[]
            }

        }
    }
</script>

<style lang="scss" scoped>

</style>