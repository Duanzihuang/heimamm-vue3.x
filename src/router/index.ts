import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/layout',
    component: () =>
      import(/* webpackChunkName: "layout" */ '../views/layout/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
