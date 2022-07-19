const { insert, list, get, update, remove  } = require('../store/mysql');

const TABLE = 'products';

async function listProducts(){
    const result = await list(TABLE);
    return result;
}
async function getProduct(id){
    const result = await get(TABLE, id);
    return result;
}
async function createProduct(product){
    const result = await insert(TABLE, product);
    return result;
}
async function updateProduct(product, id){
    const result = await update(TABLE, product, id);
    return result;
}
async function deleteProduct(id){
    const result = await remove(TABLE, id);
    return result;
}

module.exports = {
    createProduct,
    listProducts,
    getProduct,
    updateProduct,
    deleteProduct,
}