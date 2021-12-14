const express = require('express');
const router = express.Router();
const customerController = require('./customerController')

router.get('/', customerController.list);
router.get('/:_id', customerController.show);
router.post('/:_id', customerController.setStatus);

module.exports = router;