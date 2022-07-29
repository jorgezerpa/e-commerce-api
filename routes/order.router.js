const express = require('express');
const boom = require('@hapi/boom');
const controller = require('../controllers/order.controller');
const router = express.Router();
const passport = require('passport');
// const authorization = require('../utils/authorization/productsAuthorization');

const filesExpect  = [{name:'image', maxCount:1}, {name:'file', maxCount:1}]; //multer 

router.get('/', async(req, res, next) => {
    try {
        const orders = await controller.getOrders();
        res.status(200).json({
            orders: orders
        })
    } catch (e) {
        next(e)
    }
})



    //make order
router.post('/',
    passport.authenticate('jwt', {session:false, }),
    async(req, res, next)=>{
    const { productId, seller } = req.body;
    const { id } = req.user;
    try{
        const mailsStatus = await controller.sendMails({ buyer_id:id, seller_id:seller, product_id:productId });
        const addOrderStatus = await controller.createOrder({ buyer_id:id, seller_id:seller, product_id:productId });

        res.status(200).json({
            message: 'order made with success',
            info: {
                mailsStatus,
                addOrderStatus,
            }
        }) 
    }
    catch(e){
        next(e)
    }
})


module.exports = router;