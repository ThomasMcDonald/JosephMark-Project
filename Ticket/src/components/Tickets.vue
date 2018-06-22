<template>
  <div>
    <app-nav></app-nav>
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal class="mb-0">
          <b-input-group>
              <b-button variant="success" size="sm" @click.stop="addTicketModal()" class="mr-1">Submit New Ticket</b-button>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-table responsive striped hover :items="tickets" :fields="fields"> :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
      <template slot="priority" slot-scope="data">
        <b-badge variant="danger">{{data.value}}</b-badge>
      </template>
      <template slot="Info" slot-scope="row">
        <b-button size="sm" class="mr-1">Details</b-button>
      </template>
    </b-table>



  <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
        <pre>{{ modalInfo.content }}</pre>
  </b-modal>

  <b-modal ref="addTicket" hide-footer title="Create a new ticket">
    <b-form @submit="onSubmit">
      <b-form-group id="ticketGroup">
        <label for="ticketTitle">Title</label>
        <b-form-input required id="ticketTitle" type="text" v-model="form.title" required placeholder="Enter Title"></b-form-input>

        <label for="ticketDescription">Description</label>
        <b-form-textarea required id="ticketDescription" v-model="form.description" placeholder="Enter Description" :rows="3" :max-rows="6"></b-form-textarea>

        <label for="ticketPriority">Priority</label>
        <b-form-select id="ticketPriority" v-model="form.priority" class="mb-3" required>
          <option :value="null">Level of Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </b-form-select>

        <label for="type-date">Due Date</label>
        <b-form-input id="type-date" type="date" v-model="form.dueDate" required></b-form-input>


        <label for="ticketPriority">Assign Ticket</label>
        <b-form-select id="ticketPriority" v-model="form.assignedTo" class="mb-3">
        <option :value="null">Level of Priority</option>
        </b-form-select>

      </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-modal>

  </div>
</template>


<script>
import AppNav from './AppNav'
import { getTickets, deleteTicket, addTicket } from '../utils/ticket-api.js'

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
      form: {
        title: '',
        description: '',
        priority: '',
        dueDate: null,
        resolvedDate: null,
        createdBy: null,
        assignedTo: null
      },
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
    async getTickets () {
      getTickets().then((tickets) => {
        console.log('Getting Tickets')
        console.log(tickets)
        this.tickets = tickets
      })
    },
    deleteTicket (id) {
      console.log(id)
      deleteTicket(id)
    },
    info (item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    addTicketModal () {
      this.$refs.addTicket.show()
    },
    onSubmit (evt) {
      evt.preventDefault()
      addTicket(JSON.stringify(this.form)).then(
        this.getTickets().then(
          this.$refs.addTicket.hide()))
    }
  },
  mounted () {
    this.getTickets()
  }
}
</script>
