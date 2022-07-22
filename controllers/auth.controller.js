const { filterByEmail  } = require('../store/mysql');
const boom = require('@hapi/boom');

const TABLE = 'auth';

async function getAuthByEmail(email){
    const result = await filterByEmail(TABLE, email);
    if(result.length<=0){
        throw boom.unauthorized('unauthorized')
    }
    return result[0];
}

module.exports = {
    getAuthByEmail,
}