
const express = require('express');
const route = express.Router();
const controller = require('../../controllers/client/cart.controller')

route.get('/', controller.index);
route.get('/update/:productId/:quantity', controller.updateQtt);
route.get('/delete/:productId', controller.delete);
route.post('/add/:productId', controller.addToCart);

module.exports = route;