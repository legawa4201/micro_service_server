const { User, Product, Category } = require(`../models`)
const { verifToken } = require("../helpers/jwt")

const authentication = async(req, res, next) => {
    try {
        const { access_token } = req.headers
        if(!access_token) return res.status(401).json({ message: `Invalid token` })

        const { id } = verifToken(access_token)
        const user = await User.findByPk(id)
        if(!user) return res.status(404).json({ message: `Invalid token` })
        req.userId = user.id
        next()
    } catch (error) {
        if(error.name === `JsonWebTokenError`) {
            return res.status(401).json({ message: `Invalid token` })
        }
    }
}

const authorization = async(req, res, next) => {
    try {
        const { productId } = req.params
        const product = await Product.findByPk(productId)
        if(!product) return res.status(404).json({ message: `Product not found!` })

        const { userId } = req
        if(product.authorId != userId) return res.status(400).json({ message: `You don't have the rights to do this act!` })
        next()
    } catch (error) {
        res.status(500).json({ message: `Internal Server Error` })
    }
}

module.exports = {
    authentication,
    authorization
}