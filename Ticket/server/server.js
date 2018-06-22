'use strict';

const express = require('express');
var cors = require('cors')
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

var Ticket = require(path.resolve( __dirname,'models/ticket.js'));


mongoose.connect('mongodb://localhost:27017/tickets');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

//Retrieve all Tickets
app.get('/api/tickets', (req, res) => {
  Ticket.find(function (error, tickets) {
    if (error) { console.error(error); }
    res.send({
      tickets: tickets
    })
  }).sort({_id:-1})
})

// Add new Ticket
app.post('/api/addticket', (req, res) => {
  var db = req.db;
  var parseParams = JSON.parse(req.body.params)
  console.log(parseParams.title)

  var new_ticket = new Ticket({
    title: parseParams.title,
    description: parseParams.description,
    priority: parseParams.priority,
    dueDate: parseParams.dueDate,
    resolvedDate: parseParams.resolvedDate ==  null ? "not Resolved" : "Resolved",
    createdBy: parseParams.createdBy ==  null ? "" : parseParams.createdBy ,
    assignedTo: parseParams.assignedTo
  });

  new_ticket.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Ticket saved successfully!'
    })
  })

})

// Delete the ticket matching the id param
app.post('/api/deleteticket/:id',(req, res) =>{
  console.log(req.params)
  Ticket.remove({
    _id: req.params.id
  }, function(err, post){
    if (err)
      res.send(err)
    res.send({
      success: true,
      message: 'Ticket saved successfully!'
    })
  })
});


// Remove all the tickets, for testing purposes only
app.post('/api/removeAllTickets',(req, res) =>{
  Ticket.remove({}, function(err, post){
    if (err)
      res.send(err)
    res.send({
      success: true,
      message: 'All Tickets Removed Correctly'
    })
  })
});


app.listen(3333);
console.log('Listening on localhost:3333');
