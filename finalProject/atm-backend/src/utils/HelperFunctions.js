function generateRandom6DigitNumber() {
    const number = parseInt(Math.random().toFixed(6).replace("0.", ""));
    return number;
}

function getIFSCCode() {
    return "SBIN001122"
}

module.exports = { generateRandom6DigitNumber, getIFSCCode }