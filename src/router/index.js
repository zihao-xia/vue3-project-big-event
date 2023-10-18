import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores'

// history模式：createWebHistory 地址栏不带 # 需要支持 HTML5 History API 的浏览器 服务器需对所有路由返回相同index.html
// hash模式：createHashHistory 地址栏带 # 兼容性更好 服务器不需要特殊配置
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // vite中的环境变量，可在vite.config.js中配置
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') {
    return '/login'
  }
})

export default router
