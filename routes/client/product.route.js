const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/product.controller')

router.get('/', controller.index);

router.get('/detail/:slug', controller.detail);
router.get('/:categorySlug', controller.category)
module.exports = router;

