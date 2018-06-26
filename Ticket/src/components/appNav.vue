<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Ticket App</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item @click="logout()">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    </div>
</template>


<script>
import localforage from 'localforage'
import router from '../router'
export default {
  name: 'app-nav',
  methods: {
    logout () {
      localforage.removeItem('token').then(() => {
        console.log('Successfully Logged Out')
        router.push('/')
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
