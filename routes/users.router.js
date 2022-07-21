const express = require('express');
const boom = require('@hapi/boom');
const controller = require('../controllers/users.controller');
const validatorhandler = require('../middlewares/validatorHandler');
const router = express.Router();
const { createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema } = require('../schemas/user.schema');
const { uploadUser } = require('../utils/multer');

const filesExpect  = [{name:'image', maxCount:1}]; //multer 

    //get  all users
router.get('/', async(req, res, next)=>{
    try{
        const users = await controller.listUsers();
        res.status(200).json({
            users: users
        }) 
    }
    catch(e){
        next(e)
    }
})

    //get  one user
router.get('/:id', validatorhandler(getUserSchema, 'params'),  async(req, res, next)=>{
    try{
        const { id } = req.params;
        const user = await controller.getUser(id);
        res.status(200).json({
            user: user
        })
    }
    catch(e){
        next(e)
    }
    
})

    //create product
    // validatorhandler(createProductSchema, 'body')
router.post('/', uploadUser.fields(filesExpect) , async(req, res, next)=>{
    try{
        const data = {
            ...req.body,
            image: req.files.image[0].filename,
        }
        const {error} = createUserSchema.validate(data);
        if(error) throw(error);
        const result = await controller.createUser(data);
        res.status(201).json({
            message: 'user created',
            result: result,
        });
    }
    catch(e){
        next(boom.badRequest(e))
    }
})
    
    
    //delete product
router.delete('/:id', validatorhandler(deleteUserSchema, 'params'), async(req, res, next)=>{
    try{
        const { id } = req.params;
        const result = await controller.deleteUser(id);
        res.status(200).json({
            message: 'user deleted',
        })
    }
    catch(e){
        next(e)
    }
})

    //update product
router.patch('/:id',
uploadUser.fields(filesExpect),    
validatorhandler( getUserSchema, 'params'),
async(req, res, next)=>{
try{
    let data = {...req.body};
    if(req.files.image){
        data.image = req.files.image[0].filename;
    }
    const { id } = req.params;
    const { error } = updateUserSchema.validate(data);
    if(error){throw(boom.badRequest(error))}
    
                //here is the work
    const result = await controller.updateUser(data, id);
    res.status(200).json({
        message: 'user updated',
        result: result
    });
}
catch(e){
    next(e)
}
})



module.exports = router;