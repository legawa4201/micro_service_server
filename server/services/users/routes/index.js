const router = require(`express`).Router()

const UserController = require("../controllers/userController")

router.post(`/register`, UserController.register)

router.post(`/login`, UserController.login)

router.get(`/users`, UserController.getUsers)

router.get(`/users/:id`, UserController.getUser)
router.delete(`/users/:id`, UserController.unregister)

module.exports = router