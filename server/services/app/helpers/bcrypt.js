const bcryptjs = require(`bcryptjs`)

const hashPass = (plainPass) => {
    return bcryptjs.hashSync(plainPass, 10)
}

const checkPass = (plainPass, hashedPass) => {
    return bcryptjs.compareSync(plainPass, hashedPass)
}

module.exports = {
    hashPass,
    checkPass
}