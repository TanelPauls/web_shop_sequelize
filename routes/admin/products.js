const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/product.js');

router.post('/products/add', (req, res) => {
    productController.addProduct(req, res)
});

router.get('/products', (req, res) => {
    productController.getAllAdminProducts(req, res)
});

router.get('/products/:id', productController.getAdminProductById);

router.patch('/products/edit/:id', productController.editAdminProduct);

router.delete('/products/delete/:id', productController.deleteAdminProduct);

module.exports = router;