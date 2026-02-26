const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/product.js');

router.post('/products/add', (req, res) => {
    productController.addProduct(req, res)
});

module.exports = router;