
const AccountModel = require("../models/Account.Model");
const OTPModel = require("../models/OTP.Model");
const BaseService = require("./Base.Service");
const { getIFSCCode } = require("../utils/HelperFunctions");
const { createHash, compareText } = require("../utils/bcrypt");
const { generateQrCode } = require("../utils/qrCode");
const ENV_Variable = require('../config/App.Config');

class AccountService extends BaseService {

    static async getAllAccounts() {
        try {
            const result = await AccountModel.find()
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    static async getAccountByName(name) {
        try {
            const result = await AccountModel.findOne({ name })
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    static async getAccountByAccountNumber(accountNumber) {
        try {
            const result = await AccountModel.findOne({ accountNo: accountNumber })
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    static async getAccountByEmail(email) {
        try {
            const result = await AccountModel.findOne({ email })
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    static async getAccountByMobileNumber(mobileNo) {
        try {
            const result = await AccountModel.findOne({ mobileNo })
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    static async creatAccount(createBody) {
        try {
            const { name, email, mobileNo, accountNumber, pin } = createBody;

            // Checking Account Number
            const existingAccountByAccountNumber = await this.getAccountByAccountNumber(accountNumber);
            if (existingAccountByAccountNumber) {
                return { error: true, message: "Account already exist with provided account number" };
            }

            // Checking Name
            const existingAccountByName = await this.getAccountByName(name);
            if (existingAccountByName) {
                return { error: true, message: "Account already exist with provided name" };
            }

            // Checking Email
            const existingAccountByEmail = await this.getAccountByEmail(email);
            if (existingAccountByEmail) {
                return { error: true, message: "Account already exist with provided email" };
            }

            // Checking Mobile Number
            const existingAccountByMobileNumber = await this.getAccountByMobileNumber(mobileNo);
            if (existingAccountByMobileNumber) {
                return { error: true, message: "Account already exist with provided mobile number" };
            }

            const encryptedPin = createHash(pin);
            const ifscNumber = getIFSCCode();
            const account = new AccountModel({ name, mobileNo, email, accountNo: accountNumber, ifscCode: ifscNumber, pin: encryptedPin });
            await account.save();
            return { account }
        } catch (error) {
            console.error(error);
        }
    }

    static async updateBalance(updateBody) {
        try {
            const { accountNumber, pin, balance } = updateBody;

            const accountInfo = await this.getAccountByAccountNumber(accountNumber)
            if (!accountInfo) {
                return { error: true, message: "Account Info Not Found" }
            }

            if (pin) {
                const comparePinResult = compareText(pin, accountInfo.pin)
                if (!comparePinResult) {
                    return { error: true, message: "Pin Incorrect" }
                }
            }

            const updatedAccount = await AccountModel.findByIdAndUpdate(accountInfo.id, { balance }, { new: true });
            return updatedAccount
        } catch (error) {
            console.error(error);
        }
    }

    static async transactionMode1(updateBody) {
        try {
            const { accountNumber, name, ammount, pin } = updateBody;

            // Check Account Number
            const accountInfoByAccountNumber = await this.getAccountByAccountNumber(accountNumber)
            if (!accountInfoByAccountNumber) {
                return { error: true, message: "Account Info Not Found for Account Number" }
            }

            // Check Name
            const accountInfoByName = await this.getAccountByName(name)
            if (!accountInfoByName) {
                return { error: true, message: "Account Info Not Found for Name" }
            }

            // Compare Account Number for Both Finds
            if (accountInfoByAccountNumber.id !== accountInfoByName.id) {
                return { error: true, message: "Account Number and Name does not Match" }
            }

            // Pin check
            const comparePinResult = compareText(pin, accountInfoByAccountNumber.pin)
            if (!comparePinResult) {
                return { error: true, message: "Pin Incorrect" }
            }

            const ammountToUpdate = parseInt(ammount)

            // Balance Check
            if (accountInfoByAccountNumber.balance < ammountToUpdate) {
                return { error: true, message: 'Insufficient Fund' }
            }

            const updatedBalance = accountInfoByAccountNumber.balance - ammountToUpdate;

            const updatedAccount = await this.updateBalance({ accountNumber, pin, balance: updatedBalance })
            return updatedAccount
        } catch (error) {
            console.error(error);
        }
    }

    static async transactionMode2(updateBody) {
        try {
            const { accountNumber, ifscCode, ammount, pin } = updateBody;

            // Check Account Number
            const accountInfoByAccountNumber = await this.getAccountByAccountNumber(accountNumber)
            if (!accountInfoByAccountNumber) {
                return { error: true, message: "Account Info Not Found for Account Number" }
            }

            // Compare IFSC Code
            if (accountInfoByAccountNumber.ifscCode !== ifscCode) {
                return { error: true, message: "IFSC code does not Match" }
            }

            // Pin check
            const comparePinResult = compareText(pin, accountInfoByAccountNumber.pin)
            if (!comparePinResult) {
                return { error: true, message: "Pin Incorrect" }
            }

            const ammountToUpdate = parseInt(ammount)

            // Balance Check
            if (accountInfoByAccountNumber.balance < ammountToUpdate) {
                return { error: true, message: 'Insufficient Fund' }
            }

            const updatedBalance = accountInfoByAccountNumber.balance - ammountToUpdate;

            const updatedAccount = await this.updateBalance({ accountNumber, pin, balance: updatedBalance })
            return updatedAccount
        } catch (error) {
            console.error(error);
        }
    }

    static async findOTPRecord(email) {
        try {
            const result = await OTPModel.findOne({ email })
            return result;
        } catch (error) {
            console.log(error);
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

    static async transactionMode3(updateBody) {
        try {
            const { email, ammount, pin } = updateBody;

            // Checking Email
            const accountInfoByAccountByEmail = await this.getAccountByEmail(email);
            if (!accountInfoByAccountByEmail) {
                return { error: true, message: "ccount Info Not Found for Email" };
            }

            // Verify Otp as PIN
            const comparePinResult = await this.verifyotp({ email, otp: pin })
            if (!comparePinResult) {
                return { error: true, message: "OTP Incorrect" }
            }

            const ammountToUpdate = parseInt(ammount)

            // Balance Check
            if (accountInfoByAccountByEmail.balance < ammountToUpdate) {
                return { error: true, message: 'Insufficient Fund' }
            }

            const accountNumber = accountInfoByAccountByEmail.accountNo;

            const updatedBalance = accountInfoByAccountByEmail.balance - ammountToUpdate;

            const updatedAccount = await this.updateBalance({ accountNumber, pin: 0, balance: updatedBalance })
            return updatedAccount
        } catch (error) {
            console.error(error);
        }
    }

    static async generateQrCode(updateBody) {
        try {
            const { ammount } = updateBody;

            const qrText = `${ENV_Variable.payment.url}?ammount=${ammount}`

            const qrPath = generateQrCode(qrText);

            return `${ENV_Variable.backend.url}/${qrPath}`
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = AccountService