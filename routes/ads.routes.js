const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

const AdController = require('../controllers/Ads.controller');

router.get('/ads', AdController.getAll);

router.get('/ads/:id', AdController.getById);

router.post('/ads', authMiddleware, imageUpload.single('image'), AdController.addAd);

router.delete('/ads/:id', authMiddleware, AdController.deleteAd);

router.put('/ads/:id', authMiddleware, imageUpload.single('image'), AdController.uppdateAd);

router.get('/ads/search/:searchPhrase', AdController.searchPhrase);

module.exports = router;