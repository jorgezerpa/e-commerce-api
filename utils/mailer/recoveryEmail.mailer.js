const { boomify } = require("@hapi/boom");
const nodemailer = require("nodemailer");

async function sendRecoveryEmail(user, token) {

        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: 'jorgelzd181102@gmail.com', 
            pass: process.env.EMAIL_TOKEN, 
          },
        });
        const result = await transporter.sendMail({
          from: '"3D assests marketplace 👻" <3dassets@example.com>', // sender address
          to: user.email, // list of receivers
          subject: "account recovery password", // Subject line
          html: `
            <b>Hi! ${user.first_name},</b>
            <p>this is your recovery password token</p>
            <p>${token}</p>
            `,
        });
        return result
}

module.exports = {
    sendRecoveryEmail
    }