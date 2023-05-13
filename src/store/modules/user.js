
import {setToken,getToken,delToken} from '../../utils/storage'
export default{
    namespaced:true,
    state:{
        token:getToken(),
        userInfo:null
    },
    mutations:{
        setUserToken(state,payload){
            state.token=payload
            setToken(payload)
        },
        loginout(state){
            state.token=null
            delToken()
        },
        setUserInfo(state,payload){
            state.userInfo=payload
        },
        delUserInfo(state){
            state.userInfo=null
        }
    }
}