'use strict';

const express = require('express');
const app = express();

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dbuser',
  password : 's3kreee7',
  database : 'my_db'
});


//Api call to retrieve all Tickets
app.get('/api/tickets', (req, res) => {
  console.log("Tickets Requested")
  let tickets = [
  {
    title: "Ticket 1",
    description: 'Startup NYC',
    priority: "High",
    dueDate: "11-11-2012",
    resolvedDate: "10-11-2012",
    createdBy: 12345,
    assignedTo: 12345
  },
  {
    title: "Ticket 2",
    description: 'Startup NYC',
    priority: "High",
    dueDate: "11-11-2012",
    resolvedDate: "10-11-2012",
    createdBy: 12345,
    assignedTo: 12345
  },
  {
    title: "Ticket 2",
    description: 'Startup NYC',
    priority: "High",
    dueDate: "11-11-2012",
    resolvedDate: "10-11-2012",
    createdBy: 12345,
    assignedTo: 12345
  },
  {
    title: "Ticket 2",
    description: 'Startup NYC',
    priority: "High",
    dueDate: "11-11-2012",
    resolvedDate: "10-11-2012",
    createdBy: 12345,
    assignedTo: 12345
  },
  {
    title: "Ticket 3",
    description: 'Startup NYC',
    priority: "High",
    dueDate: "11-11-2012",
    resolvedDate: "10-11-2012",
    createdBy: 12345,
    assignedTo: 12345
  }];

  res.json(tickets);
})

app.listen(3333);
console.log('Listening on localhost:3333');
