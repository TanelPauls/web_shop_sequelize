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

    async addToCart(req, res) {
        const productId = parseInt(req.body.productId);
        const requestedQty = parseInt(req.body.quantity) || 1;

        if (!productId || requestedQty <= 0) {
            return res.status(400).json({ message: 'Invalid productId or quantity' });
        }

        try {
            const cart = await req.user.getCart();
            const products = await cart.getProducts({
                where: { id: productId }
            });

            let product = products[0];
            let newQuantity = requestedQty;

            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + requestedQty;
            } else {
                product = await Product.findByPk(productId);
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }
            }

            await cart.addProduct(product, {
                through: { quantity: newQuantity }
            });

            res.status(200).json({
                message: 'Product added to cart',
                productId,
                quantity: newQuantity
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async removeProductFromCart(req, res) {
        const productId = parseInt(req.body?.productId);

        if (!productId) {
            return res.status(400).json({ message: 'Invalid productId' });
        }

        try {
            const cart = await req.user.getCart();

            const products = await cart.getProducts({
                where: { id: productId }
            });

            const product = products[0];

            if (!product) {
                return res.status(404).json({ message: 'Product not in cart' });
            }

            await cart.removeProduct(product);

            res.status(200).json({
                message: 'Product removed from cart'
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOrder(req, res) {
        const userOrder = await req.user.getOrder();
        const orderProducts = await userOrder.getProducts();
        res.status(201).json({
            products: orderProducts
        })
    }

    async addToOrder(req, res) {
        const productId = parseInt(req.body.productId);
        const requestedQty = parseInt(req.body.quantity) || 1;

        if (!productId || requestedQty <= 0) {
            return res.status(400).json({ message: 'Invalid productId or quantity' });
        }

        try {
            const order = await req.user.getOrder();
            const products = await order.getProducts({
                where: { id: productId }
            });

            let product = products[0];
            let newQuantity = requestedQty;

            if (product) {
                const oldQuantity = product.orderItem.quantity;
                newQuantity = oldQuantity + requestedQty;
            } else {
                product = await Product.findByPk(productId);
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }
            }

            await order.addProduct(product, {
                through: { quantity: newQuantity }
            });

            res.status(200).json({
                message: 'Product added to order',
                productId,
                quantity: newQuantity
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async removeProductFromOrder(req, res) {
        const productId = parseInt(req.body?.productId);

        if (!productId) {
            return res.status(400).json({ message: 'Invalid productId' });
        }

        try {
            const order = await req.user.getOrder();

            const products = await order.getProducts({
                where: { id: productId }
            });

            const product = products[0];

            if (!product) {
                return res.status(404).json({ message: 'Product not in order' });
            }

            await order.removeProduct(product);

            res.status(200).json({
                message: 'Product removed from order'
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new shopController();