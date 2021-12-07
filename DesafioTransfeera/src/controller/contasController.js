const contaDomain = require('../domain/conta');
const contaRepository = require('../repository/contasRepository');

//Valida antes de criar a conta
const criarConta = (dados) => {
    const { cpf_cnpj, nome, email, situacao, codigo_banco, agencia, agencia_digito, conta, conta_digito, tipo_conta } = dados;
    const dadosConta = contaDomain.ContaDomain.criarConta(cpf_cnpj, nome, email, situacao, codigo_banco, agencia, agencia_digito, conta, conta_digito, tipo_conta);
    dadosConta.validaDados();
    return dadosConta;
};

//Busca todos os registros na tabela contas
const buscarTodos = async (req, res) => {
    try {
        const conta = await contaRepository.buscarTodos(req.query.skip, req.query.take);
        res.send(conta);
    } catch (e) {
        res.status(400).send(e.message);
    }
};

//Cria novo registro na tabela contas
const criar = async (req, res) => {
    try {
        const conta = criarConta(req.body);
        await contaRepository.criar(conta);
        res.send('Favorecido criado com sucesso!');
    } catch (e) {
        res.status(400).send(e.message)
    }
};

//Atualiza dados na tabela contas
const atualizar = async (req, res) => {
    try {
        const conta = criarConta(req.body);
        await contaRepository.atualizar(conta);
        res.send('Favorecido atualizado com sucesso!');
    } catch (e) {
        res.status(400).send(e.message)
    }
};

//Remove único registro na tabela contas
const remover = async (req, res) => {
    try {
        const { cpf_cnpj, codigo_banco, tipo_conta } = req.body;
        await contaRepository.remover(cpf_cnpj, codigo_banco, tipo_conta);
        res.send('Favorecido removido com sucesso!');
    } catch (e) {
        res.status(400).send(e.message)
    }
};

//Remove seleção de registros na tabela contas
const removerLista = async (req, res) => {
    try {
        const contas = req.body;
        await contaRepository.removerLista(contas);
        res.send('Favorecidos selecionados removidos com sucesso!');
    } catch (e) {
        res.status(400).send(e.message)
    }
};

module.exports = {
    buscarTodos,
    criar,
    atualizar,
    remover,
    removerLista
};