const { ObjectId } = require(`mongodb`)

const { getDB } = require("../config/config")
const { hashPass } = require("../helpers/bcrypt")

const collection = `users`

class User {
    static async findAll() {
        try {
            const database = getDB()
            const users = database.collection(collection)
            const data = await users.find().toArray()
            return data
        } catch (error) {
            throw error
        }
    }

    static async findById(id) {
        try {
            const database = getDB()
            const users = database.collection(collection)
            const user = await users.findOne({ _id: new ObjectId(id) })
            return user
        } catch (error) {
            throw error
        }
    }

    static async findOne(fields, value) {
        try {
            const database = getDB()
            const users = database.collection(collection)
            const user = await users.findOne({ [fields]: value })
            return user
        } catch (error) {
            console.log(error)
        }
    }

    static async insertOne({ username, email, password, role = `staff`, phoneNumber, address }) {
        try {
            let error = { errors: [] }
            if(!email) {
                error.name = `ValidationError`
                error.errors.push({ message: `Email is required!` })
            }
            if(!password) {
                error.name = `ValidationError`
                error.errors.push({ message: `Password is required!` })
            }
            const database = getDB()
            const users = database.collection(collection)
            const checkEmail = await users.findOne({ email })
            if(checkEmail) {
                error.name = `UniqueConstraintError`
                error.errors.push({ message: `Email must be unique!` })
            }
            if(error.name) throw error
            const hashedPass = hashPass(password)
            const newUser = await users.insertOne({ username, email, password: hashedPass, role, phoneNumber, address })
            return newUser
        } catch (error) {
            throw error
        }
    }

    static async destroyOne(id) {
        try {
            const database = getDB()
            const users = database.collection(collection)
            const response = await users.deleteOne({ _id: new ObjectId(id) })
            return response
        } catch (error) {
         throw error   
        }
    }
}

module.exports = User