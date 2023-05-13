import Vue from 'vue'
import Vuex from 'vuex'
import moduleUser from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
 modules:{
  moduleUser
 },
 getters:{
    userInfo:(state)=>state.moduleUser.userInfo
 }
})
