const { Sequelize } = require('sequelize');
require('dotenv/config');

//Dados para conexão com o banco de dados, as variável devem ser informadas no arquivo ".env" na raiz do projeto
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: 'postgres',
    logging: false
});

module.exports = sequelize;