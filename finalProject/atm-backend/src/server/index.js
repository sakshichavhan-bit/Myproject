const { createAccountRecords, updateAccount } = require('../seeder/Account.Seeder');

// Main Library To create server
const express = require('express')

// Environment Variable
const ENV_Variable = require('../config/App.Config')

// Creatin Instance of Library
const app = express();

// To accept the request from multiple host
const cors = require('cors');
app.use(cors())

// For parsing the data into json format
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

// PORT variable to run server
const PORT = ENV_Variable.app.port

// filesystem library
const fs = require('fs');

// path library
const path = require('path');

// Static Folder Creation
var createStaticPath = path.join(__dirname, "../../public")
try {
    if (!fs.existsSync(createStaticPath)) {
        fs.mkdirSync(createStaticPath);
    }
} catch (error) {
    console.log("Error in Creating Public Folder", error)
}

// Setting the static folder
app.use(express.static(createStaticPath));

// Requiring Database
require('../config/DB.Config')

// home request
app.get('/', (req, res) => {
    res.send("Welcome to Server by Express");
})

// SEEDER Run
createAccountRecords()

// ACCOUNT_API
app.use('/account', require('../routes/Account.Routes'));

// EMAIL_API
app.use('/email', require('../routes/Email.Routes'));

// Listing to the server on PORT
app.listen(PORT, () => {
    console.log(`Server started at port :- http://localhost:${PORT}`);
})
