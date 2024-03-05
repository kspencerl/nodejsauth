//esse index.js seria uma pasta para concentrar diversas rotas do seu projeto. Ex: usersRoute.js, products.Route.js, etc. Mas não é uma pasta necessária, pode exportar as rotas diretamente do módulo desejado

//concentração de rotas -- só criar se necessário esse index, senão é só usar diretamente usersRoute, pois ele já exporta o seu módulo

//para usar uma ou todas as rotas de um módulo (ter acesso a elas, tem que dar um app.use(nomeModulo) ou app.use('/umcaminhoanterior', nomeModulo). Assim vai ser possível usar as rotas definidas no usersRoute

const user = require('./usersRoute')
const auth = require('./authRoute')

const bodyParser = require('body-parser')//middleware de análise de corpo processar os dados enviados no corpo das solicitações HTTP

module.exports = app => {
    app.use(
        bodyParser.json(), //Isso permitirá que o Express analise automaticamente o corpo das solicitações com formato JSON.
        user,
        auth
    )
}

//Sem um middleware de análise de corpo configurado, o Express não conseguirá interpretar os dados do corpo da solicitação automaticamente, e req.body será undefined, como o erro que você estava enfrentando indicava. 