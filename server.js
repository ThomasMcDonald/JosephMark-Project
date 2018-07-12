'use strict';

const express = require('express');
var cors = require('cors')
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
const serveStatic = require('serve-static')
const secure = require('express-force-https');
var PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ticketSystem');
const app = module.exports = express();

app.use(secure)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

require(path.resolve( __dirname,'server/routes.js'));

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

app.use("/", serveStatic ( path.join (__dirname, '/dist') ) )

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
})

app.listen(PORT);
console.log('Listening on ' + PORT);
