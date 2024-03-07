//criação do middleware para verificar se o token é válido

const { verify, decode } = require('jsonwebtoken')
//resgatando nossa secret
const jsonSecret = require('../config/jsonSecret')

module.exports = async (req, res, next) =>{
    const token = req.headers.authorization

    if (!token) { 
        return res.status(401).send('Access token não informado')
    }
    //quebrar token
    const [, accessToken] = token.split(" ")
            //pegar segunda variável

    try {
        //validar se o secret é o correto
        verify(accessToken, jsonSecret.secret)

             //desestruturação do token
        const { id, email } = await decode(accessToken)
        
        req.userId = id
        req.userEmail = email

        return next()

    } catch (error) {
        res.status(401).send('Usuário não autorizado')
    }
}