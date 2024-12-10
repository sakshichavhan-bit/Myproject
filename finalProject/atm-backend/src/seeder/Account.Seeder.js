const AccountService = require("../services/Account.Service");

const insertAccount = async (accountInfo) => {
    const isPresent = await AccountService.getAccountByName(accountInfo.name);
    if (!isPresent) {
        await AccountService.creatAccount(accountInfo);
    }
}

const createAccountRecords = async () => {
    const recordOne = {
        name: "Nitin", email: "nitindighore26@gmail.com", mobileNo: "1234567890", pin: "123", accountNumber: "7022992134"
    }
    await insertAccount(recordOne)
}

module.exports = { createAccountRecords }