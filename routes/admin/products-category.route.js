const express = require("express");
const router = express.Router();
const productCategoryController = require('../../controllers/admin/products-category.controller');
const uploadFile = require('../../middlewares/admin/upload.middleware')
const multer = require('multer')
const upload = multer();
router.get('/', productCategoryController.index);

router.get('/create', productCategoryController.create);
router.patch('/change-multi', productCategoryController.changeStatusMulti)
router.post('/create',
    upload.single('thumbnail'),
    uploadFile.upload,
    productCategoryController.createPost
)

router.get('/edit/:id', productCategoryController.edit);
router.patch('/edit/:id',upload.single('thumbnail'), productCategoryController.editPatch)

module.exports = router;