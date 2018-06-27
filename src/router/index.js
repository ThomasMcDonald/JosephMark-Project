import Vue from 'vue'
import Router from 'vue-router'
import Tickets from '@/components/Tickets'
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
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
