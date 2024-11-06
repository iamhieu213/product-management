
const express = require('express');
const route = express.Router();
const controller = require('../../controllers/admin/auth.controller')
const validate = require('../../validates/account.validate')

const multer = require('multer')
const upload = multer();

const uploadFile = require('../../middlewares/admin/upload.middleware');


route.get('/login', controller.login);
route.post('/login', controller.loginPost);
route.get('/logout', controller.logout)
module.exports = route;