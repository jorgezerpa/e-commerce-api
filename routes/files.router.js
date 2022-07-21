const express = require('express');
const path = require('path');
const boom = require('@hapi/boom');
const router = express.Router();

        //get thumbnails
router.get('/thumbnails/:fileName', (req, res, next)=>{
    const { fileName } = req.params.fileName; 
    const options = {
        root: path.join(__dirname, '../uploads/thumbnails')
    };
    res.sendFile(req.params.fileName, options, (err) => {
        if (err) {
            next(boom.notFound('image not found'));
        } else {
            // console.log('Sent:', fileName);
        }
    });
})

            //get user avatar
router.get('/avatars/:fileName', (req, res, next)=>{
    const { fileName } = req.params.fileName; 
    const options = {
        root: path.join(__dirname, '../uploads/users')
    };
    res.sendFile(req.params.fileName, options, (err) => {
        if (err) {
            next(boom.notFound('image not found'));
        } else {
            // console.log('Sent:', fileName);
        }
    });
})

            //get product
router.get('/products/:fileName', (req, res, next)=>{
    const { fileName } = req.params.fileName; 
    const options = {
        root: path.join(__dirname, '../uploads/products')
    };
    res.sendFile(req.params.fileName, options, (err) => {
        if (err) {
            next(boom.notFound('image not found'));
        } else {
            // console.log('Sent:', fileName);
        }
    });
})


module.exports = router;