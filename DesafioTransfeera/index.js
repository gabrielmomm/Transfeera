const express = require('express');
const bodyparser = require('body-parser');
const contasController = require('./src/controller/contasController');
const bancosontroller = require('./src/controller/bancosController');
require('dotenv');

const app = express();
const route = express.Router();
const port = process.env.NODE_PORT;

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

//Rota API-Banco 
route.get('/api/banco', bancosontroller.buscarTodos);

//Rotas API-Contas
route.get('/api/conta', contasController.buscarTodos);
route.post('/api/conta', contasController.criar);
route.put('/api/conta', contasController.atualizar);
route.delete('/api/conta', contasController.remover);
route.delete('/api/contas', contasController.removerLista);

app.use('/', route);
app.listen(port || 3000, () => console.log('Serviço na porta: %s', port || 3000));
