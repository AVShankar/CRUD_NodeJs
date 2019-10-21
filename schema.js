const mongoose = require("mongoose");

var contact = mongoose.model("contacts", {
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  email: {
    type: String
  },
  address: {
    type: String
  }
});

module.exports = { contact };
