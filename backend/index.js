const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/db')

// Carrega os relacionamentos das models
require('./models/rel')

const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/auth.controller')

const motoristaController = require('./controller/motorista.controller')
const funcionarioController = require('./controller/funcionario.controller')
const entregaController = require('./controller/entrega.controller')
const cargaController = require('./controller/carga.controller')

// ----- middlewares -----
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Rotas públicas
app.post('/funcionario', funcionarioController.cadastrar)
app.post('/login', authController.login)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Aplicação rodando!' })
})

// Middleware de Autenticação para proteger as rotas abaixo
app.use(authMiddleware)

app.get('/funcionarios', funcionarioController.listar)

app.post('/motorista', motoristaController.cadastrar)
app.get('/motoristas', motoristaController.listar)
app.get('/motorista/:id', motoristaController.consultar)
app.get('/motorista/nome/:nome', motoristaController.consultarNome)
app.put('/motorista/:id', motoristaController.atualizar)
app.delete('/motorista/:id', motoristaController.apagar)

app.post('/carga', cargaController.cadastrar)
app.get('/cargas', cargaController.listar)
app.get('/carga/:id', cargaController.consultar)
app.put('/carga/:id', cargaController.atualizar)
app.delete('/carga/:id', cargaController.apagar)

app.post('/entrega', entregaController.cadastrar)
app.get('/entregas', entregaController.listar)
app.get('/entrega/:id', entregaController.consultar)
app.put('/entrega/:id', entregaController.atualizar)
app.delete('/entrega/:id', entregaController.apagar)

// Sincroniza banco e inicia o servidor
conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro ao conectar com o banco de dados!', err)
    })