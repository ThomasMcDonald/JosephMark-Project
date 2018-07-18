import axios from 'axios'
var PORT = process.env.PORT || 3000
const baseURl = 'https://ticketing-client.herokuapp.com'
// http://localhost:/'
export { getTickets, addTicket, deleteTicket, resolveTicket }

// Request all tickets
function getTickets () {
  const url = `${baseURl}/api/ticket/tickets`
  return axios.get(url).then(response => response.data.tickets)
}

// Request to add ticket
function addTicket (params) {
  const url = `${baseURl}/api/ticket/addticket`
  return axios.post(url, { params: params })
}

// Request to delete Ticket, probably not necessary but I did it
function deleteTicket (id) {
  const url = `${baseURl}/api/ticket/deleteticket`
  return axios.post(url, { params: id })
}

// Request to resolve the given ticket.
function resolveTicket (id) {
  const url = `${baseURl}/api/ticket/resolveTicket`
  return axios.post(url, { params: id })
}
