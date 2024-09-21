import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    // {
    //   path: '/home',
    //   name: 'abhomeout',
    //   component: () => import('@/views/home/index.vue')
    // },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/index.vine')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/pages/home/index.vine')
    }
  ]
})





//写一个登录的路由导航守卫
router.beforeEach((to, from, next) => {
  //默认放行所有 还没写就一个架子,到时候你自己写
  next()
})

export default router
//这个是pinia 的一个持久化的一个插件   