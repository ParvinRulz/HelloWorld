const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true
  },
  email:{
    type: String,
    unique: true
  },
  phone:{
    type: String,
    trim: true
  },
  role:{
    type: String
  },
  password:{
    type: String
  }
});

module.exports = mongoose.model('Registration', registrationSchema);