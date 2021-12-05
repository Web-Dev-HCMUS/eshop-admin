const express = require('express');
const router = express.Router();
const profileController = require('./profileController')

router.get('/list/search', profileController.search);
router.get('/list', profileController.list);
router.post('/:_id/update', profileController.update);
router.post('/:_id/delete', profileController.delete);
router.get('/:_id', profileController.show);
router.get('/', profileController.show);

module.exports = router;