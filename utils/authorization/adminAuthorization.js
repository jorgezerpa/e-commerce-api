const usersController = require('../../controllers/users.controller');
const boom = require('@hapi/boom');

async function isAdmin(req, res, next){
    try{
        const { id } = req.user;
        const user = await usersController.getUser(id);
        if(user[0] && user[0].role !== 'admin'){  //if user not create this product
            throw(boom.unauthorized('unauthorized'))
        }
        next()
    }
    catch(e){
        next(e)
    }
}

module.exports = { isAdmin }