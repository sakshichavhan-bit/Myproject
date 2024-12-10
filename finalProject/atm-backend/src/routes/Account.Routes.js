// Router Configuration
const router = require('express').Router()

// Controller
const AccountController = require('../controllers/Account.Controller');


router.get("/get-all-accounts", AccountController.getAllAccounts);
router.post("/create-account", AccountController.creatAccount);
router.post("/transaction-mode1", AccountController.transactionMode1);
router.post("/transaction-mode2", AccountController.transactionMode2);
router.post("/transaction-mode3", AccountController.transactionMode3);
router.post("/generate-qr-code", AccountController.generateQrCode);


module.exports = router