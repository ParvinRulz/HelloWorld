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

arrivalDate: {
    type: Date
},

arrivalTime: {
    type: String,
}
});

module.exports = mongoose.model("Vehicle", vehicleRegistration);