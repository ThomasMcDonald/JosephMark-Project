<template>
  <div class="login-wrapper border border-light">
    <b-tabs>
      <b-tab title="Login" active>
        <b-form @submit.prevent="login" class="loginForm">
          <b-form-group id="ticketGroup">
            <label for="ticketTitle">Username</label>
            <b-form-input required id="email" type="text" v-model="credentials.email" required placeholder="Enter Emails"></b-form-input>

            <label for="ticketTitle">Password</label>
            <b-form-input required id="password" type="password" v-model="credentials.password" required placeholder="Enter Password"></b-form-input>

          </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-tab>
      <b-tab title="Register">
        <b-form @submit.prevent="register" class="loginForm">
          <b-form-group id="userRegister">
            <label for="Remail">Email</label>
            <b-form-input required id="Remail" type="text" v-model="registerCredentials.email" required placeholder="Enter Email"></b-form-input>

            <label for="Rusername">Username</label>
            <b-form-input required id="Rusername" type="text" v-model="registerCredentials.username" required placeholder="Enter Username"></b-form-input>

            <label for="Rpassword">Password</label>
            <b-form-input required id="Rpassword" type="password" v-model="registerCredentials.password" required placeholder="Enter Password"></b-form-input>

          </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-tab>
    </b-tabs>
    <vue-toast ref='toast'></vue-toast>
  </div>
</template>

<script>
import { validateCredentials, registerUser } from '../utils/user-Api.js'
import localforage from 'localforage'
import 'vue-toast/dist/vue-toast.min.css'
import VueToast from 'vue-toast'
import router from '../router/'
export default {
  name: 'Login',
  components: { VueToast },
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      },
      registerCredentials: {
        email: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      validateCredentials(JSON.stringify(this.credentials)).then((user) => {
        if (user.data.error == null) {
          console.log(user)
          localforage.setItem('_id', user.data._id)
          localforage.setItem('token', user.data.token).then(() => {
            router.push('Dashboard')
          })
        } else {
          this.$refs.toast.showToast(user.data.error, {
            theme: 'error',
            timeLife: 3000
          })
        }
      })
    },
    register () {
      registerUser(JSON.stringify(this.registerCredentials)).then((user) => {
        if (user.data.error == null) {
          this.$refs.toast.showToast('User Created, Please Log In', {
            theme: 'success',
            timeLife: 3000
          })
          this.registerCredentials.email = ''
          this.registerCredentials.username = ''
          this.registerCredentials.password = ''
        } else {
          this.$refs.toast.showToast(user.data.error, {
            theme: 'error',
            timeLife: 3000
          })
        }
      })
    },
    resetOptions () {
      this.$refs.toast.setOptions({
        maxToasts: 6,
        position: 'bottom middle'
      })
    }
  },
  mounted () {
    this.resetOptions()
  }
}
</script>

<style lang="css">
body {
  background: #605B56;
}

.loginForm {
  width:75%;
  margin:auto;
  margin-top:1em;
  padding-bottom:1em;
}

.login-wrapper {
  background: #fff;
  width: 70%;
  margin: 12% auto;
  border-radius: 5px;
}


</style>
