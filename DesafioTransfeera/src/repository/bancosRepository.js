const Banco = require('../model/bancos');

//Busca todos os resultados da tabela bancos
const buscarTodos = async () => await Banco.findAll();

module.exports = {
    buscarTodos
}