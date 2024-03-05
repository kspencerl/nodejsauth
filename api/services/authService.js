const database = require('../models')  // ../ sair da nossa pasta

//função compare da bibliote bcrypt.js que retorna um valor boleano
const { compare } = require('bcrypt')

const { sign } = require('jsonwebtoken') //função que faz a geração do token
const jsonSecret = require('../config/jsonSecret')

class AuthService{
    //função async de login recebendo um dto
    async login(dto){
        //BUSCAR USUÁRIO
        const user = await database.users.findOne({
            attributes: ['id', 'email', 'password'], //array - definindo colunas
            where: {
                email: dto.email
            }
        })
        //caso usuário não exista
        if (!user) {
            throw new Error('User not found/registered.')
        }

        //VALIDAR SENHA
        const equalpasswords = await compare(dto.password, user.password) //senha do dto, senha do banco de dados
        
        if(!equalpasswords){
            throw new Error('Invalid username/email or password')
        }

        //Função SIGN faz a geração do nosso token
        const accessToken = sign({
            id: user.id,
            email: user.email

        },//<-sign(PAYLOAD (informações do usuário): string | object | Buffer
        //* a seguir o secret, código único para o nosso projeto. Vamos usar o md5 https://www.md5.cz/
        jsonSecret.secret, //hash padrão no config
        //SignOptions & { algorithm: "none"; }) | undefined): string 
        { //*tempo para o nosso token expirar
            expiresIn: 86400 //um dia em segundos
        })  

        return { accessToken } //retornando token dentro da variável accessToken

    }

}
module.exports = AuthService;