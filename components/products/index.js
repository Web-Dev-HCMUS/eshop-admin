const express = require('express');
const router = express.Router();
const productsController = require('./productController')

router.get('/:slug', productsController.oneProduct);
router.get('/', productsController.list);

module.exports = router;