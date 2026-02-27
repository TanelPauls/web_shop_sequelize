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

router.get('/order', (req, res) => {
    shopController.getOrder(req, res)
});

router.post('/order/add', (req, res)=> {
    shopController.addToOrder(req, res)
});

router.post('/order/remove', (req, res)=> {
    shopController.removeProductFromOrder(req, res)
});

module.exports = router;