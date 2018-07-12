<template>
  <div>
    <app-nav></app-nav>
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Filter" class="mb-1">
          <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search" />
              <b-input-group-append>
                <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
              </b-input-group-append>
                <b-button variant="success" size="sm" @click.stop="addTicketModal" class="mr-1">Submit New Ticket</b-button>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>


    <b-table responsive striped hover show-empty :items="tickets" :fields="fields" :filter="filter">
      <template slot="createdBy" slot-scope="data">
        {{data.item.createdBy.username}}
      </template>
      <template slot="assignedTo" slot-scope="data">
        {{data.item.assignedTo.username}}
      </template>
      <template slot="priority" slot-scope="data">
        <b-badge :variant="data.value == 'High' ? 'danger' : (data.value == 'Medium' ? 'warning' : 'success')">{{data.value}}</b-badge>
      </template>
      <template slot="Info" slot-scope="data">
      <b-button size="sm" @click.stop="ticketInfo(data.item, data.index, $event.target)" class="mr-1">Details</b-button>
      </template>
    </b-table>



    <b-modal id="modalInfo" :title="modalInfo.title" ok-only>
          <pre>{{ modalInfo.description }}</pre>
          <b-button variant="danger" v-if="currentUser._id === modalInfo.assignedTo._id && modalInfo.resolvedDate == 'Not Resolved'" size="sm" class="mr-1" @click="resolveTicket(modalInfo._id)" >Resolve</b-button>
    </b-modal>

  <b-modal ref="addTicket" hide-footer title="Create a new ticket" @hide="resetTicketForm">
    <b-form @submit="createTicket">
      <b-form-group id="ticketGroup">
        <label for="ticketTitle">Title</label>
        <b-form-input required id="ticketTitle" type="text" v-model="form.title" required placeholder="Enter Title"></b-form-input>

        <label for="ticketDescription">Description</label>
        <b-form-textarea required id="ticketDescription" v-model="form.description" placeholder="Enter Description" :rows="3" :max-rows="6"></b-form-textarea>

        <label for="ticketPriority">Priority</label>
        <b-form-select id="ticketPriority" v-model="form.priority" class="mb-3" required>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </b-form-select>

        <label for="type-date">Due Date</label>
        <b-form-input id="type-date" type="date" v-model="form.dueDate" required></b-form-input>


        <label for="assignTicket">Assign Ticket</label>
        <b-form-select id="assignTicket" v-model="form.assignedTo" class="mb-3" required placeholder="Assign Ticket">
          <option v-for="user in users" v-if="user._id !== currentUser._id":value="user">
            {{ user.username }}
          </option>
        </b-form-select>

      </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-modal>

  </div>
</template>
<script>
import AppNav from './appNav'
import localforage from 'localforage'
import { getTickets, deleteTicket, addTicket, resolveTicket } from '../utils/ticket-api.js'
import { getUsers } from '../utils/user-Api.js'
export default {
  name: 'Tickets',
  components: {
    AppNav
  },
  data () {
    return {
      sortBy: null,
      filter: null,
      sortDesc: false,
      tickets: [],
      users: [],
      currentUser: {
        username: '',
        _id: ''
      },
      form: {
        title: '',
        description: '',
        priority: '',
        dueDate: null,
        resolvedDate: null,
        createdBy: '',
        assignedTo: ''
      },
      modalInfo: { title: '', description: '', _id: '', assignedTo: {username: '', id: ''}, resolvedDate: null },
      fields: [
        { key: 'title', sortable: false },
        { key: 'description', sortable: false },
        { key: 'dueDate', sortable: true },
        { key: 'resolvedDate', sortable: false },
        { key: 'createdBy', sortable: false },
        { key: 'assignedTo', sortable: true },
        { key: 'priority', sortable: false },
        { key: 'Info', sortable: false }
      ]
    }
  },
  methods: {
    async getTickets () {
      getTickets().then((tickets) => {
        console.log(tickets)
        this.tickets = tickets
        var today = new Date()
        var dd = today.getDate()
        var mm = today.getMonth() + 1
        var yyyy = today.getFullYear()
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }
        today = yyyy + '-' + mm + '-' + dd
        this.tickets.forEach((element) => {
          if (today > element.dueDate) {
            element._rowVariant = 'danger'
          }
          if (element.resolvedDate !== 'Not Resolved') {
            element._rowVariant = 'success'
          }
        })
      })
    },
    async getUsers () {
      getUsers().then((users) => {
        console.log(users)
        this.users = users
        localforage.getItem('_id').then((id) => {
          this.users.forEach((element) => {
            if (id === element._id) {
              this.currentUser.username = element.username
              this.currentUser._id = id
            }
          })
        })
      })
    },
    resolveTicket (id) {
      resolveTicket(id).then((val) => {
        this.getTickets()
        this.$refs.modalInfo.hide()
      })
    },
    deleteTicket (ticketid) {
      console.log(ticketid)
      deleteTicket(ticketid)
    },
    ticketInfo (item, index, button) {
      this.modalInfo.title = item.title
      this.modalInfo.description = item.description
      this.modalInfo._id = item._id
      this.modalInfo.assignedTo.username = item.assignedTo.username
      this.modalInfo.assignedTo._id = item.assignedTo._id
      this.modalInfo.resolvedDate = item.resolvedDate
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetTicketForm () {
      this.form.title = ''
      this.form.description = ''
      this.form._id = ''
      this.form.dueDate = ''
      this.form.assignedTo = ''
      this.form.resolvedDate = ''
    },
    addTicketModal () {
      this.$refs.addTicket.show()
    },
    createTicket (evt) {
      evt.preventDefault()
      this.form.createdBy = this.currentUser
      console.log(this.form.assignedTo)
      addTicket(JSON.stringify(this.form)).then(() => {
        this.getTickets()
        this.$refs.addTicket.hide()
      })
    }
  },
  mounted () {
    this.getUsers()
    this.getTickets()
  }
}
</script>
