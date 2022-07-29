const path = require('path');
const nodemailer = require("nodemailer");
const userController = require('../../controllers/users.controller');
const productsController = require('../../controllers/products.controller');

async function sendBuyerMail(userId, productId) {
        let userData = await userController.getUser(userId);
        const user = userData[0];
        let productData = await productsController.getProduct(productId);
        const product = productData[0];

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
          from: '"ZerpaCode Node marketplace 👻" <zerpacode@example.com>', // sender address
          to: user.email, // list of receivers
          subject: "product dispatch", // Subject line
          html: `
            <b>Hi! ${user.first_name},</b>
            <p>this is your product, emjoy it!</p>
            <p>{super duper hypeer mega product yeahhh!!}</p>
            `,
          attachments: [
              // {   // utf-8 string as an attachment
              //     filename: product.name,
              //     path: path.join(__dirname, `../../uploads/products/${product.file}`)
              // },
              {   // utf-8 string as an attachment
                  filename: product.name+'.pdf',
                  path: `http://localhost:3000/api/v1/files/products/${product.file}`,
                  contentType: 'application/pdf'
              },
            ]
        });
        return result
}


async function sendSellerMail(userId, token) {
        let userData = await userController.getUser(userId);
        const user = userData[0];

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
          subject: "Hey! you make a sell!", // Subject line
          html: `
            <b>Hi! ${user.first_name},</b>
            <p>You make a new sale! congrats!!</p>
            `,
        });
        return result
}

module.exports = {
    sendBuyerMail,
    sendSellerMail
    }