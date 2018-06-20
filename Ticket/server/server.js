'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://codetherapy.au.auth0.com/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: '{YOUR-API-AUDIENCE-ATTRIBUTE}',
    issuer: "https://codetherapy.au.auth0.com/",
    algorithms: ['RS256']
});


app.get('/api/tickets', (req, res) => {
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
    title: "Ticket 1",
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
