import localforage from 'localforage'
import axios from 'axios'
const baseURl = 'http://localhost:8080'
// 'https://jm-ticketing.herokuapp.com'

export { validateCredentials, isActiveToken, getUsers, registerUser }

// Validate credentials with server
function validateCredentials (params) {
  const url = `${baseURl}/api/user/authenticate`
  return axios.post(url, { params: params })
}

// verify that the current user token is still active
function isActiveToken () {
  const url = `${baseURl}/api/user/verifyToken`
  return localforage.getItem('token').then((jwt) => {
    return axios.post(url, { params: jwt })
  })
}

// Request all users
function getUsers () {
  const url = `${baseURl}/api/user/getUsers`
  return axios.get(url).then(response => response.data.users)
}

// Request to add user
function registerUser (params) {
  const url = `${baseURl}/api/user/register`
  return axios.post(url, { params: params })
}
