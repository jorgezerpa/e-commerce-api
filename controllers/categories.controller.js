const { insert, list, get, update, remove  } = require('../store/mysql');
const boom = require('@hapi/boom');

const TABLE = 'categories';

async function listCategories(){
    const result = await list(TABLE);
    return result;
}

async function getCategory(id){
    const result = await get(TABLE, id);
    if(result.length<=0){
        throw boom.notFound('product not found')
    }
    return result;
}

async function createCategory(product){
    const result = await insert(TABLE, product);
    return result;
}

async function updateCategory(product, id){
    const result = await update(TABLE, product, id);
    return result;
}

async function deleteCategory(id){
    const result = await remove(TABLE, id);
    return result;
}

module.exports = {
    createCategory,
    listCategories,
    getCategory,
    updateCategory,
    deleteCategory,
}