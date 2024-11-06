const express = require('express');
const route = express.Router();
const controller = require('../../controllers/admin/setting.controller');
const validate = require('../../validates/product.validate');
const multer = require('multer')
const upload = multer();
const uploadFile = require('../../middlewares/admin/upload.middleware');


route.get('/general', controller.general);

route.patch('/general', 
    upload.single('logo'),
    uploadFile.upload,
    controller.generalPatch
)

module.exports = route;