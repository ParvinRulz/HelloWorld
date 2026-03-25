const mongoose = require('mongoose');

const vehicleRegistration = new mongoose.Schema({
driverName: {
    type: String,
    trim: true
},

phoneNumber: {
    type: String,
},

vehicleType: {
    type: String,
    trim: true
},

plateNumber: {
    type: String,
    trim: true
},

vehicleModel: {
    type: String,
    trim: true
},

vehicleColor: {
    type: String,
    trim: true
},

ninNumber: {
    type: String,
    trim: true
},

receiptNumber: {
    type: String,
    unique: true
},


status: {
    type: String,
    enum: ["Parked", "Signed-out"],
    default: "Parked"
},

arrivalDate: {
    type: Date
},

arrivalTime: {
    type: String,
},

receiptNumber: {
    type: String,
    unique: true,
    sparse: true     // This tells Mongoose to allow multiple missing values
},


status: {
    type: String,
    enum: ["Parked", "Signed-out"],
    default: "Parked"
},
});


module.exports = mongoose.model("Vehicle", vehicleRegistration);