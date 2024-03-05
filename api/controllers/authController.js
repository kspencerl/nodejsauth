const AuthService = require('../services/authService')
const authService = new AuthService()

class AuthController{
    static async login(req, res){
        const { email, password } = req.body

        try {
            //enviar para o backend e fazer a solicitação de login. 
            //vamos enviar o objeto (email, senha) e esperar o retorno de um token para o nosso usuário
            const login = await authService.login({email, password})
            //retornando para o usuário o token de acesso
            res.status(200).send(login)
        } catch (error) {
            res.status(401).send({ message: error.message })
        }

    }

}

module.exports = AuthController