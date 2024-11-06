
const express = require('express');
const route = express.Router();
const controller = require('../../controllers/client/chat.controller');
const authMiddleware = require('../../middlewares/client/auth.middleware');

route.get('/', 
    authMiddleware.auth,
    controller.index
);

module.exports = route;