import Vue from 'vue'
import Router from 'vue-router'
import Tickets from '@/components/Tickets'
import Login from '@/components/login'

import { isActiveToken } from '../utils/user-Api.js'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Tickets,
      meta: { requiresLogin: true }
    }
  ]
})

// This will check if the user has a valid token
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin)) {
    isActiveToken().then((res) => {
      if (res.data.success === false) {
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next()
      }
    })
  } else {
    next()
  }
})

export default router
