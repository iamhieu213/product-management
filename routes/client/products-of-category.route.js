const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/products-of-category.js')

router.get('/:slugCategory', controller.category);

module.exports = router;