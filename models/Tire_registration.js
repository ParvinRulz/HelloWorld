const mongoose = require('mongoose');
const tireRegistration = new mongoose.Schema({
    tireType: {
        type: String,
    },

    tireSize: {
        type: String,
    },
    tireServices: {
        type: String,
    }
});

module.exports = mongoose.model("Tire", tireRegistration);