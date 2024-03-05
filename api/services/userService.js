const database = require('../models') //arquivo index em models já faz referencia a todas as nossas models
//criptografia de senha
const { hash } = require('bcrypt')
const UUID = require('uuid')

class UserService{
    //aguardar requisição e resposta da API, sem bloquear todo o funcionamento do programa. Função cadastrar async - aguardar enquanto realiza o cadastro
    async register(dto){ //dto - modelo do usuário
        //buscar na base de dados se esse usuário já existe
        const user = await database.users.findOne({
            where: {
            email: dto.email }
        })
        //verificar se o usuário já está cadastrado
        if (user){
            console.log(user)
            throw new Error('This user already exists with this email.')
        }

        try  {
            //criptografia da senha
            const passwordHash = await hash(dto.password, 8)  //senha e salt

            const newUser = await database.users.create({
                id: UUID.v4(),
                name: dto.name,
                email: dto.email,
                password: passwordHash
                            
            })

            return newUser            
        } catch (error) {
            throw new Error('Error while registering this new user.')           
        }


    }

}

module.exports = UserService