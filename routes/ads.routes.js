const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const ads = require('../controllers/ads.controller');

router.get('/ads', ads.getAll);
router.get('/ads/:id', ads.getById);
router.get('/ads/search/:searchPhrase', ads.getSearch);
router.post('/ads', authMiddleware, ads.post);
router.put('/ads/:id', authMiddleware, ads.put);
router.delete('/ads/:id', authMiddleware, ads.delete);

module.exports = router;