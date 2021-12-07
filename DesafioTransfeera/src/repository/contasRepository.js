const Conta = require('../model/contas');

//Busca todos os resultados da tabela contas
const buscarTodos = async (skip, take) =>  {
    return await Conta.contas.findAll({
        offset: skip,
        limit: take
    });
};

//Cria novo registro na tabela contas
const criar = async (conta) => {
    const dadosConta = await Conta.contas.create(conta);
    return dadosConta;
};

//Atualiza dados na tabela contas
const atualizar = async (conta) => {
    let contaAtualizada = conta;
    if (conta.situacao == Conta.situacaoConta.VALIDADO) {
        contaAtualizada = { email: conta.email };
    }

    const dadosConta = await Conta.contas.update(contaAtualizada, {
        where: {
            cpf_cnpj: conta.cpf_cnpj,
            codigo_banco: conta.codigo_banco,
            tipo_conta: conta.tipo_conta
        }
    });

    return dadosConta;
};

//Remove único registro na tabela contas
const remover = async (cpf_cnpj, codigo_banco, tipo_conta) => {
    await Conta.contas.destroy({
        where: {
            cpf_cnpj: cpf_cnpj,
            codigo_banco: codigo_banco,
            tipo_conta: tipo_conta
        }
    })
};

//Remove seleção de registros na tabela contas
const removerLista = async (contas) => {
    await contas.map(conta => remover(conta.cpf_cnpj, conta.codigo_banco, conta.tipo_conta));
};

module.exports = {
    buscarTodos,
    criar,
    atualizar,
    remover,
    removerLista
}