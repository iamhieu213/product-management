const express = require('express');
const route = express.Router();
const productsController = require('../../controllers/admin/products.controller');
const validate = require('../../validates/product.validate');
// const storage = require("../../helpers/storageMulter")
const multer = require('multer')
const upload = multer();
const uploadFile = require('../../middlewares/admin/upload.middleware');



route.get('/', productsController.index);
route.patch('/change-status/:status/:id', productsController.changeStatus);
route.patch('/change-multi', validate.changeStatusMulti, productsController.changeStatusMulti)
route.delete("/delete/:id", productsController.deleteOne);
route.get(
    "/create",
    productsController.create
)



route.post(
    "/create",
    upload.single('thumbnail'),
    uploadFile.upload,
    validate.createPost,
    productsController.createPost
)

route.get('/edit/:id', productsController.edit);
route.patch('/edit/:id', upload.single('thumbnail'), validate.createPost, productsController.editPatch);
route.get('/detail/:slug', productsController.detail);
route.get('/test', productsController.test);

module.exports = route;