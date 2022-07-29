const { insert, list } = require('../store/mysql');
const boom = require('@hapi/boom');
const mailer = require('../utils/mailer/order.mailer');

const TABLE = 'orders';

async function sendMails({buyer_id, seller_id, product_id}){
    const resultBuyer = await mailer.sendBuyerMail(buyer_id, product_id);
    const resultSeller = await mailer.sendSellerMail(seller_id, product_id);
    return { resultBuyer, resultSeller };
}
async function createOrder({ buyer_id, seller_id, product_id }){
    const result = await insert(TABLE, { buyer_id, seller_id, product_id } )
    return result;
}
async function getOrders(){
    const result = await list(TABLE);
    return result;
}

module.exports = {
    createOrder,
    sendMails,
    getOrders,
}