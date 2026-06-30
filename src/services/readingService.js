const { ReadingProgress, Book } = require('../models');

/**
 * Serviço responsável pelas regras de negócio de leitura.
 * @module services/readingService
 */

/**
 * Calcula o percentual de progresso de uma leitura.
 * @param {number} currentPage - Página atual
 * @param {number} totalPages - Total de páginas do livro
 * @returns {number} Percentual de 0 a 100
 */
const calcProgress = (currentPage, totalPages) => {
  if (!totalPages || totalPages === 0) return 0;
  return Math.min(Math.round((currentPage / totalPages) * 100), 100);
};

/**
 * Calcula o ritmo de leitura em páginas por dia e a data estimada de conclusão.
 * @param {number} currentPage - Página atual
 * @param {number} totalPages - Total de páginas do livro
 * @param {Date} startedAt - Data de início da leitura
 * @returns {{ pagesPerDay: number, estimatedFinish: Date|null }}
 */
const calcReadingPace = (currentPage, totalPages, startedAt) => {
  if (!startedAt || currentPage === 0) {
    return { pagesPerDay: 0, estimatedFinish: null };
  }

  const days = Math.max(
    1,
    Math.ceil((Date.now() - new Date(startedAt)) / (1000 * 60 * 60 * 24))
  );
  const pagesPerDay = Math.round(currentPage / days);
  const pagesLeft = totalPages - currentPage;

  if (pagesPerDay === 0) return { pagesPerDay: 0, estimatedFinish: null };

  const daysLeft = Math.ceil(pagesLeft / pagesPerDay);
  const estimatedFinish = new Date(Date.now() + daysLeft * 24 * 60 * 60 * 1000);

  return { pagesPerDay, estimatedFinish };
};

/**
 * Retorna todas as leituras do usuário com progresso e ritmo calculados.
 * @param {number} userId - ID do usuário
 * @returns {Promise<Array>} Lista de leituras com dados calculados
 */
const getUserReadings = async (userId) => {
  const readings = await ReadingProgress.findAll({
    where: { userId },
    include: [{ model: Book }],
    order: [['updatedAt', 'DESC']],
  });

  return readings.map((r) => ({
    ...r.toJSON(),
    progress: calcProgress(r.currentPage, r.Book.totalPages),
    pace: calcReadingPace(r.currentPage, r.Book.totalPages, r.startedAt),
  }));
};

/**
 * Atualiza a página atual de uma leitura e ajusta o status automaticamente.
 * @param {number} progressId - ID do ReadingProgress
 * @param {number} currentPage - Nova página atual
 * @returns {Promise<ReadingProgress>} Leitura atualizada
 */
const updatePage = async (progressId, currentPage) => {
  const progress = await ReadingProgress.findByPk(progressId, {
    include: [{ model: Book }],
  });
  if (!progress) throw new Error('Leitura não encontrada');

  progress.currentPage = currentPage;

  if (currentPage >= progress.Book.totalPages) {
    progress.status = 'lido';
    progress.finishedAt = new Date();
  } else if (currentPage > 0 && progress.status === 'quero_ler') {
    progress.status = 'lendo';
    progress.startedAt = progress.startedAt || new Date();
  }

  await progress.save();
  return progress;
};

module.exports = { calcProgress, calcReadingPace, getUserReadings, updatePage };