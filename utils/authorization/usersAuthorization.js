const controller = require('../../controllers/users.controller');
const boom = require('@hapi/boom');

async function isOwn(req, res, next){
    try{
        const { id } = req.params;
        const user = await controller.getUser(id);
        if(user[0].id !== req.user.id){  //if its the same user
            throw(boom.unauthorized('unauthorized'))
        }
        next()
    }
    catch(e){
        next(e)
    }
}

module.exports = {
    isOwn,
}