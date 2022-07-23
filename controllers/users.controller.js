const { insert, list, get, update, remove, filterByEmail  } = require('../store/mysql');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

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
    const hash = await bcrypt.hash(user.password, 10);
    const auth={
        email: user.email,
        password: hash,
    };
        //insert user
    delete user.password;
    const result = await insert(TABLE, user);
    const user_id = await filterByEmail(TABLE, user.email);
        //insert auth
    auth.id = user_id[0].id;
    const insertAuth = await insert('auth', auth);
    return result;
}

async function updateUser(product, id){
    const result = await update(TABLE, product, id, 'users');
    return result;
}

async function deleteUser(id){
    const result = await remove(TABLE, id);
    const insertAuth = await remove('auth', id);
    return result;
}

module.exports = {
    createUser,
    listUsers,
    getUser,
    updateUser,
    deleteUser,
}