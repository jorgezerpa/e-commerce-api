const express = require('express');
const path = require('path');
const boom = require('@hapi/boom');
const router = express.Router();

router.get('/thumb/:fileName', (req, res, next)=>{
    const { fileName } = req.params.fileName; 
    const options = {
        root: path.join(__dirname, '../uploads')
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