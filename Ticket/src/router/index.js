import Vue from 'vue'
import Router from 'vue-router'
import Tickets from '@/components/Tickets'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tickets',
      component: Tickets
    }
  ]
})
