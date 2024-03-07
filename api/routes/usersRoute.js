const authenticated = require('../middleware/authenticated')

//importando a função Router do express
const { Router } = require('express')
//importando cuserController
const UserController = require('../controllers/userController')

//instância da função do Router;
const router = Router()

//usar a middleware nas nossas rotas
router.use(authenticated) //! com isso, todas as rotas vão precisar (do middleware) de autenticação

//todo: rotas de get, put e delete
//agora podemos criar todos os endpoints para usuários
router
    .post('/new', UserController.register)
    .get('/users')
    .get('/users/id/:id')
    .put('/users/id/:id')
    .delete('/users/id/:id')
//^rotas criadas
module.exports = router
//exportar a variável router para conseguir importar no nosso arquivo index da pasta routes do projeto
