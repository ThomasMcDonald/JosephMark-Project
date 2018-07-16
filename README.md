# JosephMark-Project

This project was created for the JosephMark technical interview

## Tasks

| Todo             | Description                                                             |
|------------------|-------------------------------------------------------------------------|
| ~~Move server~~ |   ~~Move server from its own repo to this one~~                         |
| Change CSS Framework | Change from boostrap  |
| Reevaluate JWT   | Change Secret                                                           |
| Reevaluate JWT   | Verify the user token everytime the user tries to access the database   |
| Delete Tickets   | functionality is there, just need to add UI component to delete tickets |
| Ticket Summaries | Add summaries of all tickets i.e How many are over due, or assigned to user |
| Task History     | Keep track of all activities that have taken place i.e Ticket created |
| Reevaluate DB | redesign the database |
| Further DB checking | <li>Check if user already exists, before registering</li> |
| Real Time Updates | Add socketio to provide users with realtime data.                       |
| Login checks | <li>One session per user</li><li>get details of user that is logged in <ul><li>IP address</li><li>GeoLocation</li></ul></li>|
| Diffent Types of tickets | <li>Help request</li><li>Problem report</li>    |



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

A step by step series of examples that tell you how to get a development env running

Clone this repo

Install all required dependencies
```
npm install
```
Navigate to the root directory and start VUEjs
```
npm run dev
```
These steps are for dev purposes only.

## Deployment

Deploy as you wish, I honestly have no idea what to do here
```
npm run build
```
This app isnt served from a server so once you have run the command you will find all contents in the dist folder


## Built With

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [VUEjs](https://vuejs.org/) - The Front end framework
- [LocalForage](https://github.com/localForage/localForage) - Local Storage handler



## Authors

* **Thomas McDonald** - [Me](http://thomasmcdonald.id.au)


## Acknowledgments

* StackOverflow for helping me remember
* JosephMark for giving me this opportunity
* Google for obvious reasons
