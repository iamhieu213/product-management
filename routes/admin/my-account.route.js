
const express = require('express');
const route = express.Router();
const controller = require('../../controllers/admin/my-account.controller')
const validate = require('../../validates/account.validate')

const multer = require('multer')
const upload = multer();

const uploadFile = require('../../middlewares/admin/upload.middleware');


route.get('/', controller.index);
route.get('/edit',controller.edit);
route.patch('/edit',
    upload.single('avatar'),
    uploadFile.upload,
    controller.editPatch);
    

module.exports = route;