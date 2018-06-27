import localforage from 'localforage'
import axios from 'axios'
const baseURl = 'http://localhost:3000'

export { validateCredentials, isActiveToken, getUsers, registerUser }

function validateCredentials (params) {
  const url = `${baseURl}/api/user/authenticate`
  return axios.post(url, { params: params })
}

function isActiveToken () {
  const url = `${baseURl}/api/user/verifyToken`
  return localforage.getItem('token').then((jwt) => {
    return axios.post(url, { params: jwt })
  })
}

function getUsers () {
  const url = `${baseURl}/api/user/getUsers`
  return axios.get(url).then(response => response.data.users)
}

function registerUser (params) {
  const url = `${baseURl}/api/user/register`
  return axios.post(url, { params: params })
}
