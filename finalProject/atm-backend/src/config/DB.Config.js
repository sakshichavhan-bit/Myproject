// Environment Variable
const ENV_Variable = require('./App.Config')

// Database connection library
const mongoose = require('mongoose');

// connection string
const connectionURL = ENV_Variable.db.url;

// Initiating connection 

mongoose.connect(connectionURL, {})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));