const controller = require('../../controllers/products.controller');
const boom = require('@hapi/boom');

async function isOwn(req, res, next){
    try{
        const { id } = req.params;
        const product = await controller.getProduct(id);
        if(product[0].user_id !== req.user.id){  //if user not create this product
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