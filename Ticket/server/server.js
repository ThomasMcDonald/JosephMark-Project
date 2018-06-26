'use strict';

const express = require('express');
var cors = require('cors')
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var Ticket = require(path.resolve( __dirname,'models/ticket.js'));
var User = require(path.resolve( __dirname,'models/user.js'));
var jwt = require("jsonwebtoken");

mongoose.connect('mongodb://localhost:27017/ticketSystem');
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
  console.log(parseParams)

  var new_ticket = new Ticket({
    title: parseParams.title,
    description: parseParams.description,
    priority: parseParams.priority,
    dueDate: parseParams.dueDate,
    resolvedDate: parseParams.resolvedDate ==  null ? "Not Resolved" : parseParams.resolvedDate,
    createdBy: parseParams.createdBy,
    assignedTo: parseParams.assignedTo,
    _rowVariant: null
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

app.post('/api/resolveTicket' ,(req,res) =>{

  var today = new Date()
  var dd = today.getDate()
  var mm = today.getMonth() + 1
  var yyyy = today.getFullYear()
  if (dd < 10) { dd = '0' + dd }
  if (mm < 10) { mm = '0' + mm }
  today = yyyy + '-' + mm + '-' + dd
  Ticket.updateOne({_id: req.body.params},{ $set: { resolvedDate: today } }, function(err, ticket) {
    if (err) {
      res.send(err)
    } else {
      res.send({
        message: 'The Ticket has been Resolved'
      })
    }
  });
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


// New user Registration
app.post('/api/user/register' ,(req, res) =>{
  if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }
    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        res.send(err)
      } else {
        res.send({
          success: true,
          message: 'User Created'
        })
      }
    });
  }
});


// Authenticate user credentials
app.post('/api/user/authenticate' ,(req, res) =>{
  var credentials = JSON.parse(req.body.params)
  User.findOne({ email: credentials.email })
      .exec(function (err, user) {
        if (err) {
          return res.send({
            error: err
          })
        } else if (!user) {
          return res.send({
            error: 'User not found.'
          })
        }
        bcrypt.compare(credentials.password, user.password, function (err, result) {
          if (result === true) {
            const JWTToken = jwt.sign({
              email: credentials.email,
              _id: user._id
            },
            'secret',
            {
            expiresIn: '2h'
            });
            return res.send({
              token: JWTToken,
              _id: user._id,
              error: null
            })
          } else {
          return res.send({
              error: "Email or Password is incorrect"
            })
          }
        })
      });
});

// Verify the token being used is active
app.post('/api/user/verifyToken' ,(req,res) =>{
  return true; //
});

// Get all users in the system
app.get('/api/user/getUsers', (req,res) => {
  User.find({},{ _id: 1, username: 1},function (error, users) {
    if (error) { console.error(error); }
    res.send({
      users: users
    })
  }).sort({_id:-1})
})


app.listen(3333);
console.log('Listening on localhost:3333');
