const { checkPass } = require("../helpers/bcrypt")
const { genToken } = require("../helpers/jwt")
const User = require("../models/user")

class UserController {
    static async register(req, res) {
        try {
            const newUser = await User.insertOne(req.body)
            // res.status(201).json({ _id: newUser.id, message: `User created` })
            res.status(201).json({ message: `User created` })
        } catch (error) {
            if(error.name === `ValidationError` || error.name === `UniqueConstraintError`) {
                return res.status(400).json({ message: error.errors[0].message })
            }
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            if(!email) return res.status(400).json({ message: `Please type your email!` })
            if(!password) return res.status(400).json({ message: `Please type your password!` })

            const user = await User.findOne(`email`, email)
            if(!user || !checkPass(password, user.password)) return res.status(401).json({ message: `Invalid email or password!` })

            const access_token = genToken({ _id: user._id })
            res.status(200).json({ access_token })
        } catch (error) {
           res.status(500).json({ message: `Internal Server Error` })
        }
    }

    static async unregister(req, res) {
        try {
            const { id } = req.params
            const user = await User.findById(id)
            if(!user) return res.status(404).json({ message: `User not found` })
            const response = await User.destroyOne(id)
            res.json({ message: `User unregistered` })
        } catch (error) {
            res.status(500).json({ message: `Internal Server Error` })
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await User.findAll()
            res.json(users)
        } catch (error) {
            res.status(500).json({ message: `Internal Server Error` })
        }
    }

    static async getUser(req, res) {
        try {
            const { id } = req.params
            const user = await User.findById(id)
            delete user.password
            res.json(user)
        } catch (error) {
            res.status(500).json({ message: `Internal Server Error` })
        }
    }
}

module.exports = UserController