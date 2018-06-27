<template>
  <div class="login-wrapper border border-light">
  <b-form @submit.prevent="login">
    <b-form-group id="ticketGroup">
      <label for="ticketTitle">Title</label>
      <b-form-input required id="email" type="text" v-model="credentials.email" required placeholder="Enter Emails"></b-form-input>

      <label for="ticketTitle">Title</label>
      <b-form-input required id="password" type="password" v-model="credentials.password" required placeholder="Enter Password"></b-form-input>

    </b-form-group>
  <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
  </div>
</template>

<script>
import { validateCredentials } from '../utils/user-Api.js'
import localforage from 'localforage'
import router from '../router/'
export default {
  name: 'Login',
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      validateCredentials(JSON.stringify(this.credentials)).then((user) => {
        if (user.data.error == null) {
          console.log(user)
          localforage.setItem('token', user.data.token)
          localforage.setItem('_id', user.data._id)
          router.push('Dashboard')
        } else {
          console.log(user.data.error)
        }
      })
    }
  }
}
</script>

<style lang="css">
body {
  background: #605B56;
}

.login-wrapper {
  background: #fff;
  width: 70%;
  margin: 12% auto;
}


</style>
