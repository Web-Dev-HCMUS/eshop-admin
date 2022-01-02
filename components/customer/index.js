const express = require('express');
const router = express.Router();
const customerController = require('./customerController')

router.get('/', customerController.list);
router.get('/:_id', customerController.showById);
router.get('/user/:username', customerController.showByUsername);
router.post('/:_id', customerController.setStatus);

module.exports = router;