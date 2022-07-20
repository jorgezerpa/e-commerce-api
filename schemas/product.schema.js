const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const price = Joi.number().integer();
const user_id = Joi.number().integer();
const image = Joi.any();
const file = Joi.any();
const sells = Joi.number().integer();
const category = Joi.number().integer();

const createProductSchema = Joi.object({
    name: name.required(),
    description: description.required(),
    price: price.required(),
    user_id: user_id.required(),
    image: image.required(),
    file: file.required(),
    sells: sells.required(),
    category: category.required(),
})

const updateProductSchema = Joi.object({
    name: name,
    description: description,
    price: price,
    user_id: user_id,
    image: image,
    file: file,
    sells: sells,
    category: category,
})

const getProductSchema = Joi.object({
    id:id.required(),
})

const deleteProductSchema = Joi.object({
    id:id.required(),
})

module.exports = { 
    createProductSchema,
    updateProductSchema,
    getProductSchema,
    deleteProductSchema 
    }