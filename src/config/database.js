const {Sequelize} = require('sequelize');
require('dotenv').config();

/**
 * Instância do Sequelize configurada via variáveis de ambiente.
 * @module config/database
 */

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, // Desativa logs de SQL no console
    }
);

module.exports = sequelize;