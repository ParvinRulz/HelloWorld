const mongoose = require('mongoose');

const signOutSchema = new mongoose.Schema({
receiverName: {
    type: String,
    trim: true
},
receiptNumber: {
    type: String,
},
signoutTime: {
    type: Date,
    default: Date.now
},
phoneNumber: {
    type: String,
    trim: true
},
gender: {
    type: String,
    trim: true
},
ninNumber: {
    type: String,
    trim: true
},
vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle"
},
amountPaid: {
    type: Number,
}
});


module.exports = mongoose.model("SignOut", signOutSchema);