const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const boom = require('@hapi/boom');
const controller = require('../controllers/auth.controller');

    //get  all products
router.post('/login',
    passport.authenticate('local', {session:false}),
    async(req, res, next)=>{
    try{
        const payload = { id:req.user.id }
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        res.json({
            token: token
        });
        // controller.getToken(id) //return token 
    }
    catch(e){
        next(e)
    }
})

        // recovery password
router.post('/recovery', async(req, res, next)=>{
    try{
        const { email } = req.body;
        const result = await controller.sendRecoveryMail(email);
        res.status(200).json({
            message: 'email sended',
            info: result,
        })
    }
    catch(e){
        next(boom.badImplementation('can not send email'))
    }

})


        // update password
router.post('/update-password', async(req, res, next)=>{
    try{
        const { password, token } = req.body;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const isMatch = await controller.compareRecoveryTokens(token, payload.id);
        if(!isMatch){
            throw boom.unauthorized('unauthorized');
        }
            const result = await controller.updatePassword(password, payload.id);
            res.status(200).json({
                message: 'password updated',
                info: result
            })
    }
    catch(e){
        console.log(e)
        next(boom.unauthorized('unauthorized'))
    }

})


module.exports = router;