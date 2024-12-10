const nodemailer = require("nodemailer");
const ENV_Variable = require('../config/App.Config')

const transporter = nodemailer.createTransport({
    service: ENV_Variable.nodemailer.service,
    host: ENV_Variable.nodemailer.host,
    port: ENV_Variable.nodemailer.port,
    secure: ENV_Variable.nodemailer.secure,
    auth: {
        user: ENV_Variable.nodemailer.user,
        pass: ENV_Variable.nodemailer.pass,
    },
});

const sendOTPMail = async (toEmail, otp) => {
    const mailOptions = {
        from: ENV_Variable.nodemailer.user,
        to: toEmail,
        subject: "OTP Mail",
        text: `Please verify OTP ${otp}`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
}

module.exports = { sendOTPMail }

