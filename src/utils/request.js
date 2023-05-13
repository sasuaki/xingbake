import axios from 'axios'
import { getToken,setToken } from './storage'
import { Message,Loading } from 'element-ui'
import { login } from '../api/user'
import store from '../store'

// 创建一个新的axios实例
const request = axios.create({
    baseURL:"https://meituan.thexxdd.cn/apit",
    timeout:3000
})

// loading配置
let loading;
// 开启loaing
function startLoading(){
    loading=Loading.service({
        lock:true,
        text:"拼命加载中。。。",
        background:"rgba(0,0,0,0.7)"
    })
}
// 关闭loading
function endLoading(){
    loading.close()
}




// 使用base64对token加密操作 js-base64
import {Base64} from "js-base64"
// 封装函数进行解密
function getEToken(){
    const token = getToken()
    const base64_token = Base64.encode(token + ":")
    return "Basic " +base64_token;
}

// 请求拦截
request.interceptors.request.use(config=>{
    const token =getEToken()
    if(token){
        config.headers.Authorization=token
    }
    // 开启loading加载
    startLoading()
    return config
},err=>{
    // 关闭loading加载
    endLoading()
    return Promise.reject(err)
})

// 响应拦截
request.interceptors.response.use(response=>{
    // 关闭loading加载
    endLoading()
    console.log(response);
    return response.data
},err=>{
    // 关闭loading加载
    endLoading()
    // token过期处理，实现无感刷新
    if(err.response.status===401){
        login(store.state.userInfo)
        .then(res=>{
            let {status,data:{data:{token},msg}} =res
            setToken(token)
        })
    }else if(err.response.status===202){
        return Message.error("请上传图片")
    }else if(err.response.status>=500){
        Message.error("服务器错误")
    }
    return Promise.reject(err)
})

export default request;