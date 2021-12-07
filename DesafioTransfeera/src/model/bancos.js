const sequelize = require('../database/conexao'); //Conexão do banco de dados
const { DataTypes } = require('sequelize');
require('dotenv/config');

//Espelho da tabela BANCOS no banco de dados
const banco = sequelize.define('bancos', {
    codigo_banco: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    logotipo: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    schema: process.env.DB_SCHEMA,
    timestamps: false,
    underscored: true
});

module.exports = banco;