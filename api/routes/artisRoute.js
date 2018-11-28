const express = require('express');
const router = express.Router();
const artisController = require('../controllers/artis');

router.get('/read', artisController.getAll);
router.post('/create', artisController.create);
router.get('/read/:artisId', artisController.getById);
router.put('/update/:artisId', artisController.updateById);
router.delete('/delete/:artisId', artisController.deleteById);

module.exports = router;
