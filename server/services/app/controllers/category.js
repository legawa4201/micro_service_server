const { Category } = require(`../models`)

class CategoryController {

    static async getCategories(req, res, next) {
        try {
            const categories = await Category.findAll({ attributes: { exclude: [`createdAt`, `updatedAt`] } })
            res.json(categories)
        } catch (error) {
            res.status(500).json({ message: `Internal Server Error` })
        }
    }

    static async getSingleCategory(req, res, next) {
        try {
            const { categoryId } = req.params
            const category = await Category.findOne({ where: { id: categoryId }, attributes: [`id`, `name`] })
            if(!category) return res.status(404).json({ message: `Category not found!` })
            res.json(category)
        } catch (error) {
            res.status(500).json({ message: `Internal Server Error` })
        }
    }

    static async addCategory(req, res, next) {
        try {
            const { name } = req.body
            const newCategory = await Category.create({ name })
            res.status(400).json({ message: `Category ${newCategory.name} added` })
        } catch (error) {
            if(error.name === `SequelizeValidationError`) return res.status(400).json({ message: error.errors[0].message })
            res.status(500).json({ message: `Internal Server Error` })
        }
    }

    static  async deleteCategory(req, res, next) {
        try {
            const { categoryId } = req.params
            const category = await Category.findByPk(categoryId)
            if(!category) return res.status(404).json({ message: `Category not found!` })

            await Category.destroy({ where: { id: categoryId } })
            res.json({ message: `Category deleted` })
        } catch (error) {
           res.status(500).json({ message: `Internal Server Error` }) 
        }
    }

    static async updateCategory(req, res, next) {
        try {
            const { categoryId } = req.params
            const { name } = req.body
            await Category.update({ name }, { where: { id: categoryId } })
            res.json({ message: `Category updated` })
        } catch (error) {
            res.status(500).json({ message: `Internal Server Error` })
        }
    }
}

module.exports = CategoryController