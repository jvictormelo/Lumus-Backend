const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

/**
 * Model que representa um usuário do sistema.
 * @typedef {Object} User
 * @property {number} id - Identificador único
 * @property {string} name - Nome do usuário
 * @property {string} email - Email único do usuário
 * @property {string} password - Senha criptografada
 * @property {string} locale - Idioma preferido (pt, en, es)
 */

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    locale: {
        type: DataTypes.STRING,
        defaultValue: 'pt',
    },
});

module.exports = User;


