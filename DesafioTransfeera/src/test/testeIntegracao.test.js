const Conta = require("../model/contas");
const contaDomain = require('../domain/conta');
const tiposConta = require('../model/contas');
const axios = require('axios');
require('dotenv/config');

const criaContaTeste = () => {
    return contaDomain.ContaDomain.criarConta('08106956938', 'Gabriel Demarchi Momm', 'gabriel.momm@gmail.com', 'RASCUNHO', '275', '0828', '1', '09902515', '3', tiposConta.tipoConta.CONTA_CORRENTE);
};

test('Teste de inclusão', async () => {
    await Conta.contas.destroy({ where: {} });

    const conta = criaContaTeste();

    await axios({
        url: `http://localhost:${process.env.NODE_PORT}/api/conta`,
        method: 'post',
        data: { ...conta }
    });

    await axios.get(`http://localhost:${process.env.NODE_PORT}/api/conta`).then(function (resposta) {
        expect(resposta.data).toHaveLength(1);
    });


});

test('Teste alteração conta com situacao como VALIDADO', async () => {

    await Conta.contas.destroy({ where: {} });
    let conta = criaContaTeste();
    conta.situacao = tiposConta.situacaoConta.VALIDADO;
    await axios({
        url: `http://localhost:${process.env.NODE_PORT}/api/conta`,
        method: 'post',
        data: { ...conta }
    });

    conta.codigo_banco = '999';
    await axios({
        url: `http://localhost:${process.env.NODE_PORT}/api/conta`,
        method: 'put',
        data: { ...conta }
    });

    await axios.get(`http://localhost:${process.env.NODE_PORT}/api/conta`).then(function (resposta) {
        expect(resposta.data[0].codigo_banco).toBe('275');
    });

});

test('Teste eliminar apenas um registro', async () => {
    await Conta.contas.destroy({ where: {} });

    const conta = criaContaTeste();

    await axios({
        url: `http://localhost:${process.env.NODE_PORT}/api/conta`,
        method: 'post',
        data: { ...conta }
    });

    await axios({
        url: `http://localhost:${process.env.NODE_PORT}/api/conta`,
        method: 'delete',
        data: { ...conta }
    });

    await axios.get(`http://localhost:${process.env.NODE_PORT}/api/conta`).then(function (resposta) {
        expect(resposta.data).toHaveLength(0);
    });

});


test('Teste para eliminar multiplos registros', async () => {
    await Conta.contas.destroy({ where: {} });

    let conta = criaContaTeste();
    await axios({
        url: `http://localhost:${process.env.NODE_PORT}/api/conta`,
        method: 'post',
        data: { ...conta }
    });

    let conta2 = criaContaTeste();
    conta2.codigo_banco = '756';
    await axios({
        url: `http://localhost:${process.env.NODE_PORT}/api/conta`,
        method: 'post',
        data: { ...conta2 }
    });

    await axios({
        url: `http://localhost:${process.env.NODE_PORT}/api/contas`,
        method: 'delete',
        data: [{ ...conta }, { ...conta2 }]
    });

    await axios.get(`http://localhost:${process.env.NODE_PORT}/api/conta`).then(function (resposta) {
        expect(resposta.data).toHaveLength(0);
    });

});
