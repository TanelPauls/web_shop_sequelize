const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop.js');

router.get('/cart', (req, res) => {
    shopController.getCart(req, res)
});

module.exports = router;