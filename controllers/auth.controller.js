const { filterByEmail, update, get, remove } = require('../store/mysql');
const mailer = require('../utils/mailer/recoveryEmail.mailer');
const boom = require('@hapi/boom');
const  jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const TABLE = 'auth';

async function getAuthByEmail(email){
    const result = await filterByEmail(TABLE, email);
    if(result.length<=0){
        throw boom.unauthorized('unauthorized')
    }
    return result[0];
}

async function sendRecoveryMail(email){
    const result = await filterByEmail('users', email);
    if(result.length<=0){
        throw boom.internal('error');
    }
    const user= result[0];
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15min' });
    const saveStatus = await update('users', { recovery_token: token }, user.id)
    const status = await mailer.sendRecoveryEmail(user, token);
    return status;
}

async function updatePassword(password, id){
    const hash = await bcrypt.hash(password, 10); 
    const userResult = await update('users', { recovery_token: null }, id)
    const result = await update('auth', { password: hash }, id)
    return result;
}

async function compareRecoveryTokens(token, id){
    const user = await get('users', id);
    if(user.length<=0){
        throw boom.notFound('product not found')
    }
    if(token !== user[0].recovery_token){
        return false;
    }
    return true;
}




module.exports = {
    getAuthByEmail,
    sendRecoveryMail,
    updatePassword,
    compareRecoveryTokens,
}