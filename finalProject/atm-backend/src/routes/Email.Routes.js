// Router Configuration
const router = require('express').Router()

// Controller
const EmailController = require('../controllers/Email.Controller');


router.post("/sendotp", EmailController.sendotp);
router.post("/verifyotp", EmailController.verifyotp);


module.exports = router