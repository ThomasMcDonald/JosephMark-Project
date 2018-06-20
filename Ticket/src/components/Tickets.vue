<template>
  <div>
    <app-nav></app-nav>
  <b-table responsive striped hover :items="tickets" :fields="fields"> :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
    <template slot="priority" slot-scope="data">
      <b-badge>{{data.value}}</b-badge>
    </template>
    <template slot="Info" slot-scope="row">
      <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
        Details
      </b-button>
    </template>
  </b-table>

  <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
        <pre>{{ modalInfo.content }}</pre>
  </b-modal>

  </div>
</template>


<script>
import AppNav from './AppNav'
import { getTickets } from '../utils/ticket-api.js'

export default {
  name: 'Tickets',
  components: {
    AppNav
  },
  data () {
    return {
      sortBy: 'age',
      sortDesc: false,
      tickets: [],
      modalInfo: { title: '', content: '' },
      fields: [
        { key: 'title', sortable: false },
        { key: 'description', sortable: false },
        { key: 'dueDate', sortable: false },
        { key: 'resolvedDate', sortable: false },
        { key: 'createdBy', sortable: false },
        { key: 'assignedTo', sortable: false },
        { key: 'priority', sortable: false },
        { key: 'Info', sortable: false }
      ]
    }
  },
  methods: {
    getTickets () {
      getTickets().then((tickets) => {
        console.log('Getting Tickets')
        this.tickets = tickets
        console.log(this.tickets)
      })
    },
    info (item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    }
  },
  mounted () {
    this.getTickets()
  }
}
</script>
