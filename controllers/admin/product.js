const Product = require('../../models/product.js');

class adminController {
    async addProduct(req, res) {
        const product = await Product.create({
            title: req.body.title,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            userId: req.user.id
        })
        res.status(201).json({
            message: 'Product is added',
            productId: product.id
        })
    }

    async getAllAdminProducts(req, res) {
        const products = await Product.findAll();
        res.status(201).json({
            products: products
        })
    }

    async getAdminProductById(req, res) {
        const product = await Product.findOne({where: { id: req.params.id }});
        res.status(201).json({
            product: product
        })
    }

    async editAdminProduct(req, res) {
        try {
            const [updatedCount] = await Product.update(
                {
                    title: req.body.title,
                    price: req.body.price,
                    imageUrl: req.body.imageUrl,
                    description: req.body.description
                },
                {
                    where: { id: req.params.id }
                }
            );

            if (updatedCount === 0) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }

            return res.status(200).json({
                message: 'Product updated'
            });

        } catch (err) {
            return res.status(500).json({
                error: err.message
            });
        }
    }

    async deleteAdminProduct(req, res) {
        try {
            const deletedCount = await Product.destroy({
                where: { id: req.params.id }
            });

            if (deletedCount === 0) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }

            return res.status(200).json({
                message: 'Product deleted'
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
}

module.exports = new adminController();