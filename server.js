const jsonServer = require('json-server')
const auth = require('json-server-auth')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()


const validatorsPokemon = ["name","image","attack","defense","hp","type"]

const validatorsUser = ["email","password","role","firstName","lastName"]

server.use(middlewares)

server.use(jsonServer.bodyParser)

server.post('/register', (req, res, next) =>{
    let menssage = ""
    validatorsUser.forEach(validator => {
        if (!req.body.hasOwnProperty(validator)) {
            menssage += " " + validator
        }
    });
    if (menssage === "") {
        next()
    } else {
        res.status(206).jsonp({
            error: "Falta propiedades:" + menssage
        })
    }
})

server.post('/pokemons', (req, res, next) => {
    
    let menssage = ""
    validatorsPokemon.forEach(validator => {
        if (!req.body.hasOwnProperty(validator)) {
            menssage += " " + validator
        }
    });
    if (menssage === "") {
        next()
    } else {
        res.status(206).jsonp({
            error: "Falta propiedades:" + menssage
        })
    }
})

const rules = auth.rewriter({
    pokemons: 660,
    types: 444,
    roles: 444
})

server.use(rules)
server.db = router.db
server.use(auth)
server.use(router)

server.listen(3000, () => {
    console.log('JSON Server is running')
})