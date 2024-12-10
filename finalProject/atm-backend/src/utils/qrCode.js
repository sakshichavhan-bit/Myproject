const qr = require("qrcode");
const fs = require('fs');

const generateQrCode = (text) => {
    const outputPath = 'public/payment_qr.png';

    qr.toFile(outputPath, text, (err) => {
        if (err) throw err;
        console.log(`Generated QR code at ${outputPath}`);
    })

    return "payment_qr.png";
}

module.exports = { generateQrCode };