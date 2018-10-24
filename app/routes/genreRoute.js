const express = require('express');
const router = express.Router();
const genreController = require('../api/controllers/genre');

router.get('/read', genreController.getAll);
router.post('/create', genreController.create);
router.put('/update/:genreId', genreController.updateById);
router.delete('/delete/:genreId', genreController.deleteById);

module.exports = router;
