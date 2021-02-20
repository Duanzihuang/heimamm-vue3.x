import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getToken } from '@/utils/token'

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
      import(/* webpackChunkName: "layout" */ '../views/layout/index.vue'),
    children: [
      {
        path: 'welcome',
        component: () =>
          import(
            /* webpackChunkName: "login" */ '../views/layout/welcome/index.vue'
          )
      },
      {
        path: 'chart',
        component: () =>
          import(
            /* webpackChunkName: "login" */ '../views/layout/chart/index.vue'
          )
      },
      {
        path: 'user',
        component: () =>
          import(
            /* webpackChunkName: "login" */ '../views/layout/user/index.vue'
          )
      },
      {
        path: 'enterprise',
        component: () =>
          import(
            /* webpackChunkName: "login" */ '../views/layout/enterprise/index.vue'
          )
      },
      {
        path: 'question',
        component: () =>
          import(
            /* webpackChunkName: "login" */ '../views/layout/question/index.vue'
          )
      },
      {
        path: 'subject',
        component: () =>
          import(
            /* webpackChunkName: "login" */ '../views/layout/subject/index.vue'
          )
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.fullPath === '/login') {
    next()
  } else {
    const token = getToken()
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
