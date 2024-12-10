const bcrypt = require('bcryptjs');

const createHash = (text) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(text, salt);
    return hash
}

const compareText = (text, hash) => {
    const compareResult = bcrypt.compareSync(text, hash);
    return compareResult
}

module.exports = { createHash, compareText }