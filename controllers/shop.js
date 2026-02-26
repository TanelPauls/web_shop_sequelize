const Product = require('../models/product.js');
const Cart = require('../models/cart.js');

class shopController {
    async getAllProducts(req, res) {
        const products = await Product.findAll();
        res.status(201).json({
            products: products
        })
    }

    async getCart(req, res) {
        const userCart = await req.user.getCart();
        const cartProducts = await userCart.getProducts();
        res.status(201).json({
            products: cartProducts
        })
    }
}

module.exports = new shopController();