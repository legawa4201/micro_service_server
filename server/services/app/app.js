const express = require(`express`)
const app = express()
const PORT = process.env.PORT || 4002

const cors = require(`cors`)
const adminRouter = require("./routes/admin")
const clientRouter = require("./routes/client")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(`/pub`, clientRouter)
app.use(`/`, adminRouter)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))