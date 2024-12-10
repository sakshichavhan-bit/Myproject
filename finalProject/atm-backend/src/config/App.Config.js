require('dotenv').config();

// config.js
module.exports = {
    app: {
        port: process.env.PORT || 5555,
    },
    db: {
        url: process.env.DB_URL || "mongodb://localhost:27017/atm_backend",
    },
    nodemailer: {
        service: process.env.NODEMAILER_SERVICE || "Gmail",
        host: process.env.NODEMAILER_HOST || "smtp.gmail.com",
        port: Number(process.env.NODEMAILER_PORT) || 465,
        secure: Boolean(process.env.NODEMAILER_SECURE) || true,
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
    },
    payment: {
        url: process.env.PAYMENT_URL || "http://localhost:5173/payment"
    },
    backend: {
        url: process.env.BACKEND_URL || "http://localhost:5555"
    }
};