const BancoRepository = require('../repository/bancosRepository.js');

//Busca todos os registros na tabela bancos
const buscarTodos = async (req, res) => {
    try {
        const bancos = await BancoRepository.buscarTodos();
        res.send(bancos);
    } catch (e) {
        res.status(400).send(e.message);
    }
};

module.exports = {buscarTodos}