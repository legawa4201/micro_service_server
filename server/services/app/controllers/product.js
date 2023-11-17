const { checkPass } = require("../helpers/bcrypt")
const { genToken } = require("../helpers/jwt")
const { User, Product, Category, Image, sequelize } = require(`../models`)

class ProductController {
    
    static async getProducts(req, res, next) {
        try {
            // const products = await Product.findAll({ attributes: { exclude: [`createdAt`, `updatedAt`] },include: [{ model: User, attributes: [`username`] }, { model: Category, attributes: [`name`] }, { model: Image, attributes: { exclude: [`createdAt`, `updatedAt`] } }] })
            const products = await Product.findAll({ attributes: { exclude: [`createdAt`, `updatedAt`] }, include: [{ model: Category, attributes: [`name`] }, { model: Image, attributes: [`imgUrl`] }] })
            res.json(products)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: `Internal Server Error` })
        }
    }

    static async getSingleProduct(req, res, next) {
        try {
           const { productId } = req.params
           console.log(productId)
           const product = await Product.findOne({ where: { id: productId }, attributes: { exclude: [`categoryId`, `authorId`, `createdAt`, `updatedAt`] }, include: [{ model: Category, attributes: [`id`,`name`] }] })
           if(!product) return res.status(404).json({ message: `Product not found!` })
           res.json(product)
        } catch (error) {
            res.status(500).json({ message: `Internal Server Error` })
        }
    }

    static async addProduct(req, res, next) {
        try {
            const { name, price, description, mainImg, images, categoryId, authorMongoId } = req.body

            const transaction = await sequelize.transaction()
            try {
                const product = await Product.create({ name, price, description, mainImg, categoryId, authorMongoId }, { transaction })

                const newImages = images.map((img) => ({ imgUrl: img, productId: product.id }))
                const new_images = await Image.bulkCreate(newImages, { transaction })

                await transaction.commit()
                res.status(201).json({ message: `${name} added` })
            } catch (error) {
                if(error.name === `SequelizeValidationError` || `SequelizeDatabaseError`) {
                    res.status(400).json({ message: error.errors[0].message })
                }
                await transaction.rollback()
            }
        } catch (error) {
            res.status(500).json({ message: `Internal Server Error` })
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const { productId } = req.params
            await Image.destroy({ where: { productId } })
            await Product.destroy({ where: { id: productId } })
            res.status(200).json({ message: `Product deleted` })
        } catch (error) {
            res.status(500).json({ message: `Internal Server Error` })
        }
    }

    static async updateProduct(req, res, next) {
        try {
            const { productId } = req.params
            const { name, price, description, mainImg, categoryId } = req.body
            const product = await Product.update({ name, price, description, mainImg, categoryId }, { where: { id: productId } })
            res.json({ message: `Product updated` })
        } catch (error) {
            if(error.name === `SequelizeValidationError`) {
                return res.status(400).json({ message: error.errors[0].message })
            }
            res.status(500).json({ message: `Internal Server Error` })
        }
    }
}

module.exports = ProductController