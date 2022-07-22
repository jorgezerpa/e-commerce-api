const Joi = require('joi');

const id = Joi.number().integer();
const username = Joi.string();
const first_name = Joi.string();
const last_name = Joi.string();
const description = Joi.string();
const image = Joi.string();
const password = Joi.string();
const email = Joi.string();
// const current_income = Joi.number();


const createUserSchema = Joi.object({
    username: username.required(),
    first_name: first_name.required(),
    last_name: last_name.required(),
    description: description.required(),    
    image: image.required(),
    password: password.required(),
    email: email.required(),
})

const updateUserSchema = Joi.object({
    username: username,
    first_name: first_name,
    last_name: last_name,
    description: description,    
    image: image,
})

const getUserSchema = Joi.object({
    id:id.required(),
})

const deleteUserSchema = Joi.object({
    id:id.required(),
})

module.exports = { 
    createUserSchema,
    updateUserSchema,
    getUserSchema,
    deleteUserSchema 
    }