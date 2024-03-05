const AuthController = require('../controllers/authController')
//função Router
const { Router } = require('express')
//criação da variável router para fazer a criação das nossas rotas
const router = Router()

router
    .post('/auth/login', AuthController.login)
    
module.exports = router