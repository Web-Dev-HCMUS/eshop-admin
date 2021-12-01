const express = require('express');
const router = express.Router();
const productsController = require('./productController')

router.get('/search', productsController.search);
router.get('/add', productsController.create);
router.post('/add', productsController.store);
router.post('/:id/update', productsController.update);
router.get('/:id/delete', productsController.delete);
router.get('/:slug', productsController.detail);
router.get('/', productsController.list);

module.exports = router;