const mongoose = require('mongoose');

// Define a Mongoose schema
const AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique : true,
    },
    mobileNo: {
        type: String,
        required: true,
        unique : true,
    },
    email: {
        type: String,
        required: true,
        unique : true,
    },
    accountNo: {
        type: String,
        required: true,
        unique : true,
    },
    ifscCode: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Account', AccountSchema);