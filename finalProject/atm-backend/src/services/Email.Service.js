const BaseService = require("./Base.Service")
const OTPModel = require("../models/OTP.Model");
const { sendOTPMail } = require("../utils/nodemailer");
const { generateRandom6DigitNumber } = require("../utils/HelperFunctions");

class EmailService extends BaseService {

    static async findOTPRecord(email) {
        try {
            const result = await OTPModel.findOne({ email })
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    static async createOTPRecord(emailBody) {
        try {
            const { email, otp } = emailBody;
            const otpRecord = new OTPModel({ email, otp });
            await otpRecord.save();
            return otpRecord
        } catch (error) {
            console.error(error);
        }
    }

    static async updateOTPRecord(emailBody) {
        try {
            const { email, otp } = emailBody;

            const updatedRecord = await OTPModel.updateOne({ email: email }, {
                $set: {
                    otp: otp
                }
            })
            return updatedRecord;
        } catch (error) {
            console.error(error);
        }
    }

    static async sendotp(emailBody) {
        try {
            const { email } = emailBody;
            const otp = generateRandom6DigitNumber();

            const otpRecord = await this.findOTPRecord(email)
            let updatedRecord;

            if (otpRecord) {
                updatedRecord = await this.updateOTPRecord({ email, otp });
            } else {
                updatedRecord = await this.createOTPRecord({ email, otp });
            }

            await sendOTPMail(email, otp);
            return true
        } catch (error) {
            console.error(error);
        }
    }

    static async verifyotp(emailBody) {
        try {
            const { email, otp } = emailBody;

            const otpRecord = await this.findOTPRecord(email)
            if (!otpRecord) {
                return { error: true, message: "OTP Record Not Found" }
            }

            if (otpRecord.otp === otp) {
                return true
            } else {
                return { error: true, message: "OTP Incorrect" }
            }

            return true
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = EmailService