const PDFDocument = require('pdfkit');
const { ReadingProgress, Book, User } = require('../models');

/**
 * Serviço responsável por gerar dados e arquivos de relatório.
 * @module services/reportService
 */

/**
 * Calcula as estatísticas de leitura de um usuário.
 * @param {number} userId - ID do usuário
 * @returns {Promise<Object>} Estatísticas calculadas
 */
const getUserStats = async (userId) => {
  const readings = await ReadingProgress.findAll({
    where: { userId, status: 'lido' },
    include: [{ model: Book }],
  });

  const totalBooks = readings.length;
  const totalPages = readings.reduce((sum, r) => sum + r.Book.totalPages, 0);

  const ratings = readings.filter((r) => r.rating).map((r) => r.rating);
  const averageRating = ratings.length
    ? (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1)
    : 0;

  const genreCount = {};
  readings.forEach((r) => {
    const genre = r.Book.genre || 'Não informado';
    genreCount[genre] = (genreCount[genre] || 0) + 1;
  });

  const favoriteGenre = Object.keys(genreCount).reduce(
    (a, b) => (genreCount[a] > genreCount[b] ? a : b),
    'Nenhum'
  );

  return { totalBooks, totalPages, averageRating, favoriteGenre, readings };
};

/**
 * Gera um relatório em PDF com as estatísticas de leitura do usuário,
 * enviando diretamente como stream na resposta HTTP.
 * @param {number} userId - ID do usuário
 * @param {import('express').Response} res - Objeto de resposta do Express
 */
const generatePdfReport = async (userId, res) => {
  const user = await User.findByPk(userId);
  const stats = await getUserStats(userId);

  const doc = new PDFDocument({ margin: 50 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=relatorio-lumus.pdf');

  doc.pipe(res);

  doc.fontSize(24).text('Lumus — Relatório de Leituras', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Leitor: ${user.name}`, { align: 'center' });
  doc.moveDown(2);

  doc.fontSize(16).text('Resumo Geral');
  doc.moveDown(0.5);
  doc.fontSize(12).text(`Total de livros lidos: ${stats.totalBooks}`);
  doc.text(`Total de páginas lidas: ${stats.totalPages}`);
  doc.text(`Gênero favorito: ${stats.favoriteGenre}`);
  doc.text(`Nota média: ${stats.averageRating}`);
  doc.moveDown(2);

  doc.fontSize(16).text('Livros Lidos');
  doc.moveDown(0.5);

  stats.readings.forEach((r) => {
    doc.fontSize(12).text(`${r.Book.title} — ${r.Book.author}`, { continued: false });
    doc.fontSize(10).text(
      `Nota: ${r.rating || 'Sem nota'} | Gênero: ${r.Book.genre || 'Não informado'}`
    );
    if (r.opinion) {
      doc.fontSize(10).text(`Opinião: ${r.opinion}`);
    }
    doc.moveDown();
  });

  doc.end();
};

module.exports = { getUserStats, generatePdfReport };