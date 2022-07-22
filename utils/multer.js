const multer = require('multer');

        //storage products
const  storageProducts = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.fieldname==='file'){
            cb(null, 'uploads/products')
        }
        if(file.fieldname==='image'){ 
            cb(null, 'uploads/thumbnails')
        }
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+file.originalname);
    }
})

const uploadProduct = multer({storage: storageProducts});



        //storage user
        const  storageUser = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/users')
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+file.originalname);
    }
})

const uploadUser = multer({storage: storageUser});

        //middleware
        
module.exports = {
    uploadProduct,
    uploadUser,
};