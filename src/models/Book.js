const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

/**
 * Model que representa um livro cadastrado no sistema.
 * @typedef {Object} Book
 * @property {number} id - Identificador único
 * @property {string} title - Título do livro
 * @property {string} author - Nome do autor
 * @property {number} totalPages - Total de páginas do livro
 * @property {string} genre - Gênero literário
 * @property {string} coverUrl - URL da capa (opcional)
 */

const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalPages: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
    },
    coverUrl: {
        type: DataTypes.STRING,
            },
});

module.exports = Book;