const { MongoClient } = require(`mongodb`)

const uri_development = `mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1`
let uri_production = process.env.DATABASE_URL || "mongodb+srv://legawap12:l577lHfQx4AbNoqS@cluster0.g2glqrn.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"

const client = new MongoClient(uri_production)

let DB;
async function connectDB() {
    try {
        const database = client.db(`service-user`)
        DB = database
    } catch (error) {
        console.log(error, `-----From config.js-----`)
        throw error
    }
}

const getDB = () => {
    return DB
}

module.exports = {
    connectDB,
    getDB
}