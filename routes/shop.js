const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop.js');

router.get('/cart', (req, res) => {
    shopController.getCart(req, res)
});

router.post('/cart/add', (req, res)=> {
    shopController.addToCart(req, res)
});

router.post('/cart/remove', (req, res)=> {
    shopController.removeProductFromCart(req, res)
});

module.exports = router;