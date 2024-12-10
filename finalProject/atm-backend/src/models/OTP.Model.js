const mongoose = require('mongoose');

// Define a Mongoose schema
const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique : true,
    },
    otp: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Otp', OTPSchema);