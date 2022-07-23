const multer = require('multer');
const boom = require('@hapi/boom')

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

const uploadProduct = multer({
    storage: storageProducts,
    fileFilter: (req, file, cb) => {
        if ( file.fieldname==='image' &&
        (file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg")) {
            cb(null, true);
        }
        else if ( file.fieldname==='file' &&
            (file.mimetype == "application/pdf")) {
            cb(null, true);
        }
        // if (file.fieldname==='file' &&
        //     file.mimetype == "application/pdf") {
        //     cb(null, true);
        // }
        else {
            console.log('eeeeerroororororo')
          cb(boom.badRequest('not file type allowed'));
        }
    },
});



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
        
module.exports = {
    uploadProduct,
    uploadUser,
};