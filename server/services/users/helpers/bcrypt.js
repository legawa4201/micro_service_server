const bcrypt = require(`bcryptjs`)

const hashPass = (plainPass) => {
    return bcrypt.hashSync(plainPass, 10)
}

const checkPass = (plainPass, hashedPass) => {
    return bcrypt.compareSync(plainPass, hashedPass)
}

module.exports = {
    hashPass,
    checkPass
}