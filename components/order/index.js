const express = require('express');
const router = express.Router();
const orderController = require('./orderController')

router.get('/:_id/delete', function(){console.log('fdafdasfdsfs')}, orderController.cancelOrder);
router.get('/:_id/update', orderController.updateStatus);
router.get('/:_id', orderController.showOrder);
router.get('/', orderController.getCart);

module.exports = router;