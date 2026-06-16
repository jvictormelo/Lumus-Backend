const sequelize = require('../config/database');
const User = require('./User');
const Book = require('./Book');
const ReadingProgress = require('./ReadingProgress');

/** Define associações entre os modelos
 * @module models/index
 */

User.hasMany(ReadingProgress, {foreignKey: 'userId', onDelete: 'CASCADE'});
ReadingProgress.belongsTo(User, {foreignKey: 'userId'});
Book.hasMany(ReadingProgress, {foreignKey: 'bookId'});
ReadingProgress.belongsTo(Book, {foreignKey: 'bookId'});

/**
 * Sincroniza os modelos com o banco de dados, criando as tabelas se necessário.
 * @returns {Promise<void>}
 */
const syncDatabase = async () => {
    try {
        await sequelize.sync({alter: true});
        console.log('Banco de dados sincronizado.');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error.message);
        process.exit(1);
    }
};
module.exports = { sequelize, User, Book, ReadingProgress, syncDatabase };