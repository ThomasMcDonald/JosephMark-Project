<template>
  <div>
    <app-nav></app-nav>
    <h3 class="text-center">Tickets</h3>
    <hr/>

    <div class="col-sm-4" v-for="ticket in tickets">
      <b-card :title="ticket.title"
        tag="article"
        style="max-width: 20rem;"
        class="mb-2">
        <p class="card-text">
        {{ ticket.description }}
        </p>
        <b-button href="#" variant="primary">Resolve</b-button>
      </b-card>
    </div>
  </div>
</template>


<script>
import AppNav from './AppNav'
import { isLoggedIn } from '../utils/auth.js'
import { getTickets } from '../utils/ticket-api.js'

export default {
  name: 'Tickets',
  components: {
    AppNav
  },
  data () {
    return {
      tickets: ''
    }
  },
  methods: {
    isLoggedIn () {
      return isLoggedIn()
    },

    getTickets () {
      getTickets().then((tickets) => {
        console.log('Getting Tickets')
        this.tickets = tickets
        console.log(this.tickets)
      })
    }
  },
  mounted () {
    this.getTickets()
  }
}
</script>
