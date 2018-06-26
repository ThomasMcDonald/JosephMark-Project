import localforage from 'localforage'
import axios from 'axios'
const baseURl = 'http://localhost:3333'

export { validateCredentials, isActiveToken, getUsers }

function validateCredentials (params) {
  const url = `${baseURl}/api/user/authenticate`
  return axios.post(url, { params: params })
}

function isActiveToken () {
  const url = `${baseURl}/api/user/verifyToken`
  var token = ''
  localforage.getItem('token').then((jwt) => {
    token = jwt
  })
  return axios.post(url, { params: token })
}

function getUsers () {
  const url = `${baseURl}/api/user/getUsers`
  return axios.get(url).then(response => response.data.users)
}
