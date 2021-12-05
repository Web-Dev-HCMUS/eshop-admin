const express = require('express');
const router = express.Router();
const registerController = require('./registerController')

router.get('/', registerController.register);
router.post('/', registerController.restoreRegister);

module.exports = router;