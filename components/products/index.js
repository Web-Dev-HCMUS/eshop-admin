const express = require('express');
const router = express.Router();
const productsController = require('./productController')

router.get('/search', productsController.search);

router.get('/add', productsController.create);
router.post('/add', productsController.store);

router.get('/:_id/edit', productsController.edit);
router.post('/:_id/update', productsController.update);

router.post('/:_id/delete', productsController.delete);

router.get('/', productsController.list);

module.exports = router;