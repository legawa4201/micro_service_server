const express = require(`express`)
const clientRouter = express.Router()
const ProductController = require("../controllers/product")
const CategoryController = require("../controllers/category")

clientRouter.get(`/products`, ProductController.getProducts)

clientRouter.get(`/products/:productId`, ProductController.getSingleProduct)

clientRouter.get(`/categories`, CategoryController.getCategories)

clientRouter.get(`/categories/:categortId`, CategoryController.getSingleCategory)

module.exports = clientRouter