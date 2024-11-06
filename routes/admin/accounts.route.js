

const express = require('express');
const route = express.Router();
const controller = require('../../controllers/admin/accounts.controller')
const validate = require('../../validates/account.validate')

const multer = require('multer')
const upload = multer();

const uploadFile = require('../../middlewares/admin/upload.middleware');


route.get('/', controller.index);
route.get('/create', controller.create);
route.post('/create',
    upload.single('avatar'),
    uploadFile.upload,
    validate.createPost,
    controller.createPost);

route.get('/edit/:id', controller.edit);

route.patch('/edit/:id',
    upload.single('avatar'),
    uploadFile.upload,
    validate.editPatch,
    controller.editPatch);


module.exports = route;