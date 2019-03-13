const express = require('express');
const router = express.Router();

const genreController = require('./controller/genre');
const artisController = require('./controller/artis');

// genre
router.get('/genres', genreController.getAll);
router.get('/genre/lov', genreController.getLOV);
router.post('/genre', genreController.create);
router.put('/genre', genreController.update);
router.delete('/genre/:id', genreController.deleteById);
router.post('/genre/upload', genreController.uploadImg);

// artis
router.get('/artis', artisController.getAll);
router.post('/artis/upload', artisController.uploadImg);
router.post('/artis', artisController.create);
router.delete('/artis/:id', artisController.deleteById);

module.exports = router;
