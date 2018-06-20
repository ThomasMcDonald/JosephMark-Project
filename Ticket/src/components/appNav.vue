<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Ticket App</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item href="#" @click.prevent="userLogin()" v-if="!isLoggedIn()">Login</b-nav-item>
          <b-nav-item href="#" @click.prevent="userLogout()" v-else>Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- routes will be rendered here -->
    <router-view />
  </div>
</template>


<script>

import { isLoggedIn, login, logout } from '../utils/auth.js'

export default {
  name: 'app-nav',
  methods: {
    userLogin () {
      login()
    },

    userLogout () {
      logout()
    },

    isLoggedIn () {
      return isLoggedIn()
    }
  }
}
</script>
