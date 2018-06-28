import axios from 'axios'
const baseURl = 'https://jm-ticketing.herokuapp.com'

export { getTickets, addTicket, deleteTicket, resolveTicket }

// Request all tickets
function getTickets () {
  const url = `${baseURl}/api/tickets`
  return axios.get(url).then(response => response.data.tickets)
}

// Request to add ticket
function addTicket (params) {
  const url = `${baseURl}/api/addticket`
  return axios.post(url, { params: params })
}

// Request to delete Ticket, probably not necessary but I did it
function deleteTicket (id) {
  const url = `${baseURl}/api/deleteticket/` + id
  return axios.post(url)
}

// Request to resolve the given ticket.
function resolveTicket (id) {
  const url = `${baseURl}/api/resolveTicket`
  return axios.post(url, { params: id })
}
