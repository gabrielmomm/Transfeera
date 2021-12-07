const sequelize = require('../database/conexao'); //Conexão do banco de dados
const { DataTypes } = require('sequelize');
require('dotenv/config');

//Espelho da tabela CONTAS no banco de dados
const contas = sequelize.define('contas', {
    cpf_cnpj: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    situacao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    codigo_banco: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
    },
    tipo_conta: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
    },
    agencia: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    agencia_digito: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    conta: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    conta_digito: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    schema: process.env.DB_SCHEMA,
    timestamps: false,
    underscored: true
});

//tipos de conta possíveis para as contas
const tipoConta = {
	CONTA_CORRENTE: "CONTA_CORRENTE",
	CONTA_POUPANCA: "CONTA_POUPANCA",
	CONTA_FACIL: "CONTA_FACIL"
};

//sitações possíveis para as contas
const situacaoConta = {
    RASCUNHO: 'RASCUNHO',
    VALIDADO: 'VALIDADO'
}

module.exports = {
    contas,
    tipoConta,
    situacaoConta
};