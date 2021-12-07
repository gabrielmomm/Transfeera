const contaDomain = require('../domain/conta');
const tiposConta = require('../model/contas');

const criaContaTeste = () => {
    return contaDomain.ContaDomain.criarConta('08106956938', 'Gabriel Demarchi Momm', 'gabriel.momm@gmail.com', 'RASCUNHO', '275', '0828', '1', '09902515', '3', tiposConta.tipoConta.CONTA_CORRENTE);
};

test('Teste informações de conta são inválidas', async = () => {
    let conta = criaContaTeste();
    conta.cpf_cnpj = null;
    conta.email = null;
    conta.nome = null;
    conta.situacao = null;
    expect(() => {
        conta.validaDados();
    }).toThrow(Error);
});


test('Teste informação do código do banco é inválido', async () => {

    let conta = criaContaTeste();
    conta.codigo_banco = ''; 
    expect(() => {
        conta.validaDados();
    }).toThrow(Error);

    conta.codigo_banco = '01X3';
    expect(() => {
        conta.validaDados();
    }).toThrow(Error);

    conta.codigo_banco = '9988';
    expect(() => {
        conta.validaDados();
    }).toThrow(Error);

});


test('Teste para o tipo de conta CONTA_FACIL é permitido apenas para o Banco do Brasil', async = () => {

    let conta = criaContaTeste();
    conta.tipo_conta = tiposConta.tipoConta.CONTA_FACIL;
    expect(() => {
        conta.validaDados();
    }).toThrow(Error);

    let bancoDoBrasil = contaDomain.ContaDomain.criarConta('08106956938', 'Gabriel Demarchi Momm', 'gabriel.mommm@gmail.com', tiposConta.situacaoConta.RASCUNHO, '001', '0828', '1', '026913', '2', tiposConta.tipoConta.CONTA_FACIL);
    let validacao = bancoDoBrasil.validaDados();
    expect(validacao).toBe(true);

});


test('Teste informação da agencia é inválida', async () => {

    let conta = criaContaTeste();
    conta.agencia = '654321';
    expect(() => {
        conta.validaDados();
    }).toThrow(Error);

    conta.agencia = '0x298';
    expect(() => {
        conta.validaDados();
    }).toThrow(Error);


    conta.agencia = '';
    expect(() => {
        conta.validaDados();
    }).toThrow(Error);

});

test('Teste informação do dígito da agencia é inválido', async () => {

    let conta = criaContaTeste();
    conta.agencia_digito = '99';
    expect(() => {
        conta.validaDados();
    }).toThrow(Error);

    conta.agencia_digito = '-99';
    expect(() => {
        conta.validaDados();
    }).toThrow(Error);

    conta.agencia_digito = '';
    expect(conta.validaDados()).toBe(true);

    conta.agencia_digito = 'xyz';
    expect(() => {
        bankAccount.validaDados();
    }).toThrow(Error);

});


test('Teste informação da conta é inválida', async () => {

    let conta = criaContaTeste();
    conta.conta = '';
    expect(() => {
        conta.validaDados();
    }).toThrow(Error);

    conta.conta = 'xyz';
    expect(() => {
        conta.validaDados();
    }).toThrow(Error);

    conta.conta = '12345678901234567890';
    expect(() => {
        conta.validaDados();
    }).toThrow(Error);

});


test('Teste informação do digito da conta é inválido', async () => {

    let conta = criaContaTeste();
    conta.conta_digito = '555';
    expect(() => {
        conta.validaDados();
    }).toThrow(Error);

    conta.conta_digito = 'xyz';
    expect(() => {
        conta1.validaDados();
    }).toThrow(Error);

    conta.conta_digito = '';
    expect(() => {
        conta.validaDados();
    }).toThrow(Error);
});


