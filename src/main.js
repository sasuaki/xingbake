import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// 直接导入到main.js中
import "./utils/element.js"
import './styles/index.scss'
import "./styles/common.scss"



Vue.config.productionTip = false

Vue.directive("imageerror",{
  inserted(dom,options){
    // console.log(dom,options,666);
    // console.log(dom.scr);
    dom.src=dom.src||options.value
    // 监听img标签的错误事件，图片加载失败会触发onerror事件
    dom.onerror=function(){
      dom.src=options.value
    }
  },
  componentUpdated(dom,options){
    dom.src=dom.src||options.value
  }
  
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
