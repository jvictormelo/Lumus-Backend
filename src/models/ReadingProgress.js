const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');


/**
 * Model que representa o progresso de leitura de um usuário em um livro.
 * @typedef {Object} ReadingProgress
 * @property {number} id - Identificador único
 * @property {number} userId - FK para User
 * @property {number} bookId - FK para Book
 * @property {number} currentPage - Página atual da leitura
 * @property {string} status - Status: 'quero_ler' | 'lendo' | 'lido'
 * @property {number} rating - Nota de 1 a 5
 * @property {string} opinion - Opinião do leitor
 * @property {Date} startedAt - Data de início da leitura
 * @property {Date} finishedAt - Data de conclusão da leitura
 */

const ReadingProgress = sequelize.define('ReadingProgress', {
    currentPage: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    status: {
        type: DataTypes.ENUM('quero_ler', 'lendo', 'lido'),
        defaultValue: 'quero_ler',
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: {min: 1, max: 5},
    },
    opinion: {
        type: DataTypes.TEXT,
    },
    startedAt: {
        type: DataTypes.DATE,
    },
    finishedAt: {
        type: DataTypes.DATE,
    },
});

module.exports = ReadingProgress;