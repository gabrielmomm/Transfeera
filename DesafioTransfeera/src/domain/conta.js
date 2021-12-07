const tiposConta =  require('../model/contas');
const validadorEmail = require("email-validator");
require('dotenv/config');

//Valida dados nulo ou vazio
const validaNuloVazio = (str) => {
    return str == '' || !str || str.match(/^ *$/) !== null;
};

//Valida e-mail
const validaEmail = (email) => {
    return validadorEmail.validate(email); 
};

//Classe principal Conta
class Conta {

    constructor (cpf_cnpj, nome, email, situacao, codigo_banco, agencia, agencia_digito, conta, conta_digito, tipo_conta) {
        this.cpf_cnpj = cpf_cnpj;
        this.nome = nome;
        this.email = email;
        this.situacao = situacao;
        this.codigo_banco = codigo_banco;
        this.agencia = agencia;
        this.agencia_digito = agencia_digito;
        this.conta = conta;
        this.conta_digito = conta_digito;
        this.tipo_conta = tipo_conta;
        this.tipoContaValida = [tiposConta.tipoConta.CONTA_CORRENTE, tiposConta.tipoConta.CONTA_POUPANCA];
    };

    //Chama todas as validações
    validaDados () {
        try {
            this.validaDadosIniciais();
            this.validaBanco();
            this.validaAgencia();
            this.validaDigitoAgencia();
            this.validaConta();
            this.validaDigitoConta();
            this.validaTipoConta();
            return true;
        } catch (e) {
            throw e;
        }
    };

    //Valida dados iniciais
    validaDadosIniciais () {
        if (validaNuloVazio(this.cpf_cnpj)) {
            throw new Error('CPF/CNPJ é obrigatório');
        }
        if (!validaEmail(this.email)) {
            throw new Error('E-mail inválido');
        }
        if (validaNuloVazio(this.nome)) {
            throw new Error('Nome é obrigatório');
        }
        this.validateStatus();
        return true;
    };
    
    //Valida situação da conta
    validateStatus () {
        if (validaNuloVazio(this.situacao)) {
            throw new Error('Situação da conta deve ser preenchido');
        } else {
            const situacao = [tiposConta.situacaoConta.RASCUNHO, tiposConta.situacaoConta.VALIDADO].includes(this.situacao);  
            if (!situacao) {
                throw new Error(`Situação ${this.situacao} não é válida`);
            } else return true;
        }
    }

    //Valida banco informado
    validaBanco () {
        if (validaNuloVazio(this.codigo_banco)) {
            throw new Error ('Banco do favorecido não foi preenchido');
        } else {
            const reExp = /^(?:^0*)[1-9][0-9]{0,2}$/;
            const banco = this.codigo_banco.match(reExp);
            if (!banco)
                throw new Error('O campo Banco deve conter até 3 dígitos núméricos');
            else return true;
        }
    };

    //Valida tipo de conta
    validaTipoConta () {
        if (validaNuloVazio(this.tipo_conta)) {
            throw new Error('Tipo da conta não foi preenchido');
        } else {
            const tipoContaValida = this.tipoContaValida.includes(this.tipo_conta);
            if (!tipoContaValida)
                throw new Error(`O campo Tipo da conta: ${this.tipo_conta} não é permitido para este banco`);
            else return true;
        }
    };

    //Valida conta
    validaConta () {
        if (validaNuloVazio(this.conta)) {
            throw new Error('Conta não foi preenchido');
        } else {
            const reExp = /^(?:^0*)[1-9][0-9]{0,10}$/;
            const conta = this.conta.match(reExp);
            if (!conta) 
                throw new Error('O campo conta deve conter no máximo 11 dígitos numéricos');
            else return true;
        }
    };

    //Valida digito da conta
    validaDigitoConta () {
        if (validaNuloVazio(this.conta_digito)) {
            throw new Error('Digito da conta não foi preenchido')
        } else {
            const reExp = /^[0-9]{0,1}$/
            const digitoConta = this.conta_digito.match(reExp);
            if (!digitoConta) 
                throw new Error('O campo Dígito da conta deve conter 1 dígito numérico');
            else return true;
        }
    };
    //Valida preenchimento agencia
    validaAgencia () {
        if (validaNuloVazio(this.agencia)) {
            throw new Error ('Agencia deve ser preenchida');
        } else {
            const reExp = /^(?:^0*)[1-9][0-9]{0,3}$/;
            const agencia = this.agencia.match(reExp);
            if (!agencia)
                throw new Error('O campo agencia deve conter até 4 dígitos numéricos');
            else return true;
        }
    };

    //Valida preenchimento digito da agencia
    validaDigitoAgencia () {
        if (validaNuloVazio(this.agencia_digito)) {
            return true;
        } else {
            const reExp = /^[xX0-9]{0,1}$/;
            const digitoAgencia = this.agencia_digito.match(reExp);
            if (!digitoAgencia)
                throw new Error('O campo Digito da agencia deve conter 1 dígito numérico');
            else return true;
        }
    };


};

//Classe especilizada para Banco do Brasil
class ContaBB extends Conta {

    constructor (cpf_cnpj, nome, email, situacao, codigo_banco, agencia, agencia_digito, conta, conta_digito, tipo_conta) {
        super(cpf_cnpj, nome, email, situacao, codigo_banco, agencia, agencia_digito, conta, conta_digito, tipo_conta);
        this.tipoContaValida.push(tiposConta.tipoConta.CONTA_FACIL); //incluir tipo de conta específica
    }
    
};

//Classe de controle da Conta
class ContaDomain {
    static criarConta(cpf_cnpj, nome, email, situacao, codigo_banco, agencia, agencia_digito, conta, conta_digito, tipo_conta) {
        if (codigo_banco == '001') {
                return new ContaBB(cpf_cnpj, nome, email, situacao, codigo_banco, agencia, agencia_digito, conta, conta_digito, tipo_conta);
        } else {
                return new Conta(cpf_cnpj, nome, email, situacao, codigo_banco, agencia, agencia_digito, conta, conta_digito, tipo_conta);
        }
    }
}


module.exports = {
    Conta,
    ContaDomain
}