const { insert, list, get, update, remove  } = require('../store/mysql');
const boom = require('@hapi/boom');

const TABLE = 'users';

async function listUsers(){
    const result = await list(TABLE);
    return result;
}

async function getUser(id){
    const result = await get(TABLE, id);
    if(result.length<=0){
        throw boom.notFound('user not found')
    }
    return result;
}

async function createUser(user){
    const result = await insert(TABLE, user);
    return result;
}

async function updateUser(product, id){
    const result = await update(TABLE, product, id);
    return result;
}

async function deleteUser(id){
    const result = await remove(TABLE, id);
    return result;
}

module.exports = {
    createUser,
    listUsers,
    getUser,
    updateUser,
    deleteUser,
}