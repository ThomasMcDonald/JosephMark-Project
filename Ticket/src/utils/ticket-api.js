import axios from 'axios'
const baseURl = 'http://localhost:3333'

export { getTickets }

function getTickets () {
  const url = `${baseURl}/api/tickets`
  return axios.get(url).then(response => response.data)
}
