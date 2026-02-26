const Product = require('../models/product.js');

class productController {
    async getAllProducts(req, res) {
        const products = await Product.findAll();
        console.log(products);
        res.status(201).json({
            products: products
        })
    }
}

module.exports = new productController();