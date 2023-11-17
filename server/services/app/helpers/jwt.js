const jsonwebtoken = require(`jsonwebtoken`)
const SECRET = `fpo2ijf2389ujf0923mo`

const genToken = (payload) => {
    return jsonwebtoken.sign(payload, SECRET)
}

const verifToken = (token) => {
    return jsonwebtoken.verify(token, SECRET)
}

module.exports = {
    genToken,
    verifToken
}