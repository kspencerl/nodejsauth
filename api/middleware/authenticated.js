//middleware para verificar se o token é válido

const { verify } = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret')
module.exports = async (req, res, next) =>{
    const token = req.headers.authorization

    if (token) {
        res.status(401).send('access token não informado')
    }

    const [,accessToken] = token.split(" ")

    try {
        //validar se token possui o secret

    } catch (error) {
        res.status(401).send('Usuário não autorizado')
    }
}