import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'), // 一级路由:layout
    redirect: '/home', // 重定向到home 首页
    children: [
      // 二级路由：
      {
        path: '/home',
        component: () => import('@/views/home/index.vue') // 二级路由 首页
      },
      {
        path: '/question',
        component: () => import('@/views/question/index.vue') // 问答组件
      },
      {
        path: '/video',
        component: () => import('@/views/video/index.vue') // 视频组件
      },
      {
        path: '/user',
        component: () => import('@/views/user/index.vue') // 个人中心组件
      }
    ]
  },
  {
    path: '/user/profile',
    component: () => import('@/views/user/profile.vue') // 编辑资料组件
  },
  {
    path: '/user/chat',
    component: () => import('@/views/user/chat.vue') // 小智同学组件（聊天对话）
  },
  {
    path: '/login',
    name: 'login', // push{ name: 'login'}
    component: () => import('@/views/user/login.vue') // 登录组件
  },
  {
    path: '/search',
    component: () => import('@/views/search/index.vue') // 搜索组件
  },
  {
    path: '/search/result/:q', // 搜索关键字/:q
    name: 'result', // push({ name: 'result' })
    component: () => import('@/views/search/result.vue') // 搜索结果组件 
  },
  {
    path: '/article',
    component: () => import('@/views/article/index.vue') // 文章详情
  }
]

const router = new VueRouter({
  routes
})

export default router
