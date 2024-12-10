const BaseController = require("./Base.Controller");
const RequestHandler = require("../utils/RequestHandler");
const EmailService = require("../services/Email.Service");


class EmailController extends BaseController {

    static async sendotp(req, res) {
        try {
            const { email } = req.body

            const result = await EmailService.sendotp({ email })

            if (!result.error) {
                RequestHandler.sendSuccess(res, "send");
            } else {
                RequestHandler.sendError(res, "custom", result.message);
            }
        } catch (error) {
            RequestHandler.sendError(res, "send");
        }
    }

    static async verifyotp(req, res) {
        try {
            const { email, otp } = req.body

            const result = await EmailService.verifyotp({ email, otp })

            if (!result.error) {
                RequestHandler.sendSuccess(res, "verify");
            } else {
                RequestHandler.sendError(res, "custom", result.message);
            }
        } catch (error) {
            RequestHandler.sendError(res, "verify");
        }
    }

}

module.exports = EmailController