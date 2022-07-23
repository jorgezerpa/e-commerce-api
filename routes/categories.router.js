const express = require('express');
const boom = require('@hapi/boom');
const controller = require('../controllers/categories.controller');
const validatorhandler = require('../middlewares/validatorHandler');
const router = express.Router();
const { createCategorySchema, updateCategorySchema, getCategorySchema, deleteCategorySchema } = require('../schemas/category.schema');
const passport = require('passport');
const adminAuthorization = require('../utils/authorization/adminAuthorization');


const filesExpect  = [{name:'image', maxCount:1}, {name:'file', maxCount:1}]; //multer 

    //get  all categories
router.get('/', async(req, res, next)=>{
    try{
        const categories = await controller.listCategories();
        res.status(200).json({
            categories: categories
        }) 
    }
    catch(e){
        next(e)
    }
})

    //get one category
router.get('/:id', validatorhandler(getCategorySchema, 'params'),  async(req, res, next)=>{
    try{
        const { id } = req.params;
        const category = await controller.getCategory(id);
        res.status(200).json({
            category: category
        })
    }
    catch(e){
        next(e)
    }
})

router.post('/',
    passport.authenticate('jwt', { session: false }),
    adminAuthorization.isAdmin,
    validatorhandler(createCategorySchema, 'body'),
    async(req, res, next)=>{
    try{
        const data = req.body;
        const result = await controller.createCategory(data);
        res.status(201).json({
            message: 'category created',
            result: result
        })
    }
    catch(e){
        next(e)
    }
})
    
    
    //delete product
router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    adminAuthorization.isAdmin,
    validatorhandler(deleteCategorySchema, 'params'), async(req, res, next)=>{
    try{
        const { id } = req.params;
        const category = await controller.deleteCategory(id);
        res.status(200).json({
            message: 'category deleted'
        })
    }
    catch(e){
        next(e)
    }
})

    //update product
router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    adminAuthorization.isAdmin,
    validatorhandler( getCategorySchema, 'params'),
    validatorhandler( updateCategorySchema, 'body'),
    async(req, res, next)=>{
    try{
        const { id } = req.params;
        const data = req.body;
        const result = await controller.updateCategory(data, id);
        res.status(200).json({
            message: 'category updated',
            result: result
        });
    }
    catch(e){
        next(e)
    }
})



module.exports = router;