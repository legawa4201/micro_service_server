const express = require(`express`)
const adminRouter = express.Router()
const ProductController = require("../controllers/product")
const CategoryController = require("../controllers/category")

adminRouter.get(`/products`, ProductController.getProducts)
adminRouter.post(`/products`, ProductController.addProduct)
adminRouter.get(`/products/:productId`, ProductController.getSingleProduct)
adminRouter.delete(`/products/:productId`, ProductController.deleteProduct)
adminRouter.put(`/products/:productId`, ProductController.updateProduct)

adminRouter.get(`/categories`, CategoryController.getCategories)
adminRouter.post(`/categories`, CategoryController.addCategory)
adminRouter.get(`/categories/:categoryId`, CategoryController.getSingleCategory)
adminRouter.delete(`/categories/:categoryId`, CategoryController.deleteCategory)
adminRouter.patch(`/categories/:categoryId`, CategoryController.updateCategory)

module.exports = adminRouter