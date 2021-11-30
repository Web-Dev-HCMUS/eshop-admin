const express = require('express');
const router = express.Router();
const productsController = require('./productController')

router.get('/:slug/add', productsController.create);
router.post('/:slug/add', productsController.add);
router.get('/:slug/update', productsController.update);
router.get('/:slug/delete', productsController.delete);
router.get('/:slug', productsController.detail);
router.get('/', productsController.list);

module.exports = router;