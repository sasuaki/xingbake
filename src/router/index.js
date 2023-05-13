import Vue from 'vue'
import VueRouter from 'vue-router'

import {getToken} from '../utils/storage'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    component:()=>import('../views/Layout'),
    // 重定向
    redirect:'/dataanalysis',
    children:[
      {
        path:"/dataanalysis",
        component:()=>import('../views/Dataanalysis')
      },
      {
        path:"/userlist",
        component:()=>import('../views/Userlist')
      },
      {
        path:"/orderlist",
        component:()=>import('../views/Orderlist')
      },
      {
        path:"/varietylist",
        component:()=>import('../views/Varietylist')
      },
      {
        path:"/userinfo",
        component:()=>import('../views/Userinfo')
      },
      {
        path:"/addvariety",
        component:()=>import('../views/Addvariety')
      }
    ]
  },
  {
    path:"/login",
    component:()=>import('../views/Login')
  },
  {
    path:"/notfound",
    component:()=>import('../views/NotFound')
  },
  {
    path:"*",
    component:()=>import('../views/NotFound')
  }
]

const router = new VueRouter({
  routes
})

// 没有token且访问的不是登录页，就直接拦截到登录
router.beforeEach((to,from,next)=>{
  const token = getToken()
  if(to.path!=='/login'&&!token) return next('/login')
  next()
})

export default router
