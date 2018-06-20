'use strict';

const express = require('express');
var cors = require('cors')
const app = express();

app.use(cors())


//Api call to retrieve all Tickets
app.get('/api/tickets', (req, res) => {
  console.log("Tickets Requested")
  let tickets = [
  {
    title: "Ticket 1",
    description: 'Startup NYC',
    priority: "Medium",
    dueDate: "11-11-2012",
    resolvedDate: "10-11-2012",
    createdBy: "Thomas McDonald",
    assignedTo: "Thomas McDonald"
  },
  {
    title: "Ticket 2",
    description: 'Startup NYC',
    priority: "High",
    dueDate: "11-11-2012",
    resolvedDate: "10-11-2012",
    createdBy: "Thomas McDonald",
    assignedTo: "Thomas McDonald"
  },
  {
    title: "Ticket 2",
    description: 'Startup NYC',
    priority: "Low",
    dueDate: "11-11-2012",
    resolvedDate: "10-11-2012",
    createdBy: "Thomas McDonald",
    assignedTo: "Thomas McDonald"
  },
  {
    title: "Ticket 2",
    description: 'Startup NYC',
    priority: "Low",
    dueDate: "11-11-2012",
    resolvedDate: "10-11-2012",
    createdBy: "Thomas McDonald",
    assignedTo: "Thomas McDonald"
  },
  {
    title: "Ticket 3",
    description: 'Startup NYC',
    priority: "Medium",
    dueDate: "11-11-2012",
    resolvedDate: "10-11-2012",
    createdBy: "Thomas McDonald",
    assignedTo: "Thomas McDonald"
  }];

  res.json(tickets);
})

app.listen(3333);
console.log('Listening on localhost:3333');
