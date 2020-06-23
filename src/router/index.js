import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/config/token'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
  }
]

const router = new VueRouter({
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  console.log(to) // 将要访问的路径
  console.log(from) // 代表从哪个路径跳转而来
  // next() 放行 next('/login') 强制跳转
  // 如果用户访问的登录页面，直接放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = getToken('token')
  // 没有token，强制跳转到登录
  if (!tokenStr) return next('/login')
  next()
})

export default router
