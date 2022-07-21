const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();

const createCategorySchema = Joi.object({
    name: name.required(),
})

const updateCategorySchema = Joi.object({
    name: name,
})

const getCategorySchema = Joi.object({
    id:id.required(),
})

const deleteCategorySchema = Joi.object({
    id:id.required(),
})

module.exports = { 
    createCategorySchema,
    updateCategorySchema,
    getCategorySchema,
    deleteCategorySchema 
    }