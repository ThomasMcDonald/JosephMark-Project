var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
  title: String,
  description: String,
  priority: String,
  dueDate: String,
  resolvedDate: String,
  createdBy: {
    username: '',
    _id: ''
  },
  assignedTo: {
    username: '',
    _id: ''
  },
  _rowVariant: String // Added to handle the over Due color change
});

var Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
