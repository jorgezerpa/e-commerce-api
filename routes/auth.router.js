const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

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
    }
    catch(e){
        next(e)
    }
})


module.exports = router;