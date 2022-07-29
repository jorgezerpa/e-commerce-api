const express = require('express');
const filesRouter = require('./files.router');
const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const orderRouter = require('./order.router');

function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);
        router.use('/files', filesRouter);
        router.use('/categories', categoriesRouter);
        router.use('/products', productsRouter);
        router.use('/users', usersRouter);
        router.use('/auth', authRouter);
        router.use('/order', orderRouter);
}

module.exports = routerApi;