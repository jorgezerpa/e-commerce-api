const express = require('express');
const controller = require('../controllers/products.controller');
const validatorhandler = require('../middlewares/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema } = require('../schemas/product.schema');

const router = express.Router();

    //get  all products
router.get('/', async(req, res, next)=>{
    try{
        const products = await controller.listProducts();
        res.status(200).json({
            products: products
        }) 
    }
    catch(e){
        next(e)
    }
})

    //get  one product
router.get('/:id', validatorhandler(getProductSchema, 'params'),  async(req, res, next)=>{
    try{
        const { id } = req.params;
        const product = await controller.getProduct(id);
        res.status(200).json({
            product: product
        })
    }
    catch(e){
        next(e)
    }
    
})

    //create product
router.post('/', validatorhandler(createProductSchema, 'body'), async(req, res, next)=>{
    try{
        const data = req.body;
        const result = await controller.createProduct(data);
        res.status(201).json({
            message: 'product created',
            result: result,
        });
    }
    catch(e){
        next(e)
    }
})
    
    
    //delete product
router.delete('/:id', validatorhandler(deleteProductSchema, 'params'), async(req, res, next)=>{
    try{
        const { id } = req.params;
        const result = await controller.deleteProduct(id);
        res.status(204).json({
            message: 'product deleted',
        })
    }
    catch(e){
        next(e)
    }
})

    //update product
router.patch('/:id',
    validatorhandler( getProductSchema, 'params'),
    validatorhandler( updateProductSchema, 'body'),
    async(req, res, next)=>{
    try{
        const { id } = req.params;
        const data = req.body;
        const result = await controller.updateProduct(data, id);
        res.status(200).json({
            message: 'product updated',
            result: result
        });
    }
    catch(e){
        next(e)
    }
})



module.exports = router;