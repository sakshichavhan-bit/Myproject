const BaseController = require("./Base.Controller");
const RequestHandler = require("../utils/RequestHandler");
const AccountService = require("../services/Account.Service");


class AccountController extends BaseController {

    static async getAllAccounts(req, res) {
        try {
            const result = await AccountService.getAllAccounts()

            if (result.length > 0) {
                RequestHandler.sendSuccess(res, "getdata", result);
            } else {
                RequestHandler.sendError(res, "norecord");
            }
        } catch (error) {
            RequestHandler.sendError(res, "getdata");
        }
    }

    static async creatAccount(req, res) {
        try {
            const { name, email, mobileNo, accountNumber, pin } = req.body;
            const result = await AccountService.creatAccount({ name, email, mobileNo, accountNumber, pin })

            if (!result.error) {
                RequestHandler.sendSuccess(res, "create", result);
            } else {
                RequestHandler.sendError(res, "custom", result.message);
            }
        } catch (error) {
            RequestHandler.sendError(res, "getdata");
        }
    }

    static async transactionMode1(req, res) {
        try {
            const { accountNumber, name, ammount, pin } = req.body;
            const result = await AccountService.transactionMode1({ accountNumber, name, ammount, pin })

            if (!result.error) {
                RequestHandler.sendSuccess(res, "update", result);
            } else {
                RequestHandler.sendError(res, "custom", result.message);
            }
        } catch (error) {
            RequestHandler.sendError(res, "update");
        }
    }

    static async transactionMode2(req, res) {
        try {
            const { accountNumber, ifscCode, ammount, pin } = req.body;
            const result = await AccountService.transactionMode2({ accountNumber, ifscCode, ammount, pin })

            if (!result.error) {
                RequestHandler.sendSuccess(res, "update", result);
            } else {
                RequestHandler.sendError(res, "custom", result.message);
            }
        } catch (error) {
            RequestHandler.sendError(res, "update");
        }
    }

    static async transactionMode3(req, res) {
        try {
            const { email, ammount, pin } = req.body;
            const result = await AccountService.transactionMode3({ email, ammount, pin })

            if (!result.error) {
                RequestHandler.sendSuccess(res, "update", result);
            } else {
                RequestHandler.sendError(res, "custom", result.message);
            }
        } catch (error) {
            RequestHandler.sendError(res, "update");
        }
    }

    static async generateQrCode(req, res) {
        try {
            const { ammount } = req.body;
            const result = await AccountService.generateQrCode({ ammount })

            if (!result.error) {
                RequestHandler.sendSuccess(res, "qrCode", result, "Qr Created");
            } else {
                RequestHandler.sendError(res, "custom", result.message);
            }
        } catch (error) {
            RequestHandler.sendError(res, "create");
        }
    }

}

module.exports = AccountController