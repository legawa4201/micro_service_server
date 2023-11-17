const jsonwebtoken = require(`jsonwebtoken`)
const SECRET = `9wp4jwc902uc0912c3j3vq33iq39cru2`

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