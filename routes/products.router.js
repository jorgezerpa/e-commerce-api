const express = require('express');
const controller = require('../controllers/products.controller');

const router = express.Router();

    //get  all products
router.get('/', async(req, res)=>{
    try{
        const products = await controller.listProducts();
        res.json({
            products: products
        }) 
    }
    catch(e){
        console.log(e)
    }
})

    //get  one product
router.get('/:id', async(req, res)=>{
    try{
        const { id } = req.params;
        const product = await controller.getProduct(id);
        res.json({
            product: product
        })
    }
    catch(e){
        console.log(e)
    }
    
})

    //create product
    router.post('/', async(req, res)=>{
        try{
            const data = req.body;
            const result = await controller.createProduct(data);
            res.json({
                message: 'product created',
                result: result,
            });
        }
        catch(e){
            console.log(e)
        }
    })
    
    
    //delete product
router.delete('/:id', async(req, res)=>{
    try{
        const { id } = req.params;
        const result = await controller.deleteProduct(id);
        res.json({
            message: 'product deleted',
        })
    }
    catch(e){
        console.log(e)
    }
})

    //update product
router.patch('/:id', async(req, res)=>{
    try{
        const { id } = req.params;
        const data = req.body;
        const result = await controller.updateProduct(data, id);
        res.json({
            message: 'product updated',
            result: result
        });
    }
    catch(e){
        console.log(e)
    }
})



module.exports = router;