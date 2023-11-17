const express = require(`express`)
const app = express()
const PORT = process.env.PORT || 4000

const cors = require(`cors`)
const ioredis = require(`ioredis`)
const axios = require(`axios`)

const redis = new ioredis()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const uri_user = `http://localhost:4001`
const uri_prod = `http://localhost:4002`
const key_1 = "products"

app.get(`/products`, async(req, res) => {
    try {
        const products = await redis.get(key_1)
        if(products) return res.json(JSON.parse(products))
        const {status, statusText, data} = await axios(`${uri_prod}/products`)

        await redis.set(key_1, JSON.stringify(data))
        res.json(data)
    } catch (error) {
        res.status(error).json({ message: `Internal Server Error` })
    }
})

app.get(`/products/:id`, async(req, res) => {
    try {
        const { id } = req.params
        const { data: product } = await axios({
            url: `${uri_prod}/products/${id}`,
            method: `GET`
        })
        const { authorMongoId } = product
        const { data: user } = await axios({
            url: `${uri_user}/users/${authorMongoId}`,
            method: `GET`
        })
        product.user = user
        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Internal Server Error` })
    }
})

app.post(`/products`, async(req, res) => {
    try {
        const { status, statusText, data } = await axios({
            url: `${uri_prod}/products`,
            method: `POST`,
            data: req.body
        })
        if(statusText != `OK`) return res.status(400).json({ message: data.message })
        redis.del(key_1)
        res.status(201).json({ message: `Mantap` })
    } catch (error) {
        res.status(500).json({ message: `Internal Server Error` })
    }
})

app.delete(`/products/:id`, async(req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const { data } = await axios({
            url: `${uri_prod}/products/${id}`,
            method: `DELETE`
        })
        res.json({ message: `Mantap` })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Internal Server Error` })
    }
})

app.post(`/register`, async(req, res) => {
    try {
        const { data } = await axios({
            url: `${uri_user}/register`,
            method: `POST`,
            data: req.body
        })
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({ message: `Internal Server Error` })
    }
})

app.delete(`/unregister/:authorId`, async(req, res) => {
    try {
        const { authorId } = req.params
        const { data } = await axios({
            url: `${uri_user}/users/${authorId}`,
            method: `DELETE`
        })
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: `Internal Server Error` })
    }
})
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))