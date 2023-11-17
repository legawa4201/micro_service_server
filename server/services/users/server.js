const express = require(`express`)
const server = express()
const PORT = process.env.PORT || 4001

const { connectDB } = require("./config/config")
const cors = require(`cors`)
const router = require("./routes")

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(cors())

connectDB()
.then(_ =>  server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`)))
.catch(console.log)

server.use(`/`, router)