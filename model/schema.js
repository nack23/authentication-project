const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: Number,
    required: true
  },

  password: {
    type: String,
    required: true
  }

});

const firsttable = mongoose.model("registerdata", registerSchema);

module.exports = firsttable;
