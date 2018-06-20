import Vue from 'vue'
import Router from 'vue-router'
import Tickets from '@/components/Tickets'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Tickets',
      component: Tickets
    }
  ]
})
