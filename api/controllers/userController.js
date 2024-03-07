//importando userservice
const UserService = require('../services/userService')
//instanciando userservice
const userService = new UserService()

class UserController{
    static async register(req, res){ //req - contendo todos os dados do usuário. res - resposta
        const { name, email, password } = req.body

        try{
            const user = await userService.register({ name, email, password }) //await aguardar enquanto cadastra   // ( {entre chaves pq aqui é o nosso objeto dto})
            //retorno user criado
            res.status(201).send(user)
        }catch (error){
            res.status(400).send({ message: error.message })
        }
    }


    static async all(req, res){
        try {
            const users = await userService.all()
            res.status(200).send(users)            
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

//permitindo exportação
module.exports = UserController
