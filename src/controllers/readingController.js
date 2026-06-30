const { ReadingProgress, Book } = require('../models');
const readingService = require('../services/readingService');

/**
 * Controller responsável pelo progresso de leitura do usuário.
 * @module controllers/readingController
 */

/**
 * Lista todas as leituras do usuário logado, com progresso calculado.
 */
const getMyReadings = async (req, res) => {
  try {
    const readings = await readingService.getUserReadings(req.session.userId);
    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Inicia uma nova leitura (relaciona um usuário a um livro).
 */
const startReading = async (req, res) => {
  try {
    const { bookId, status } = req.body;

    const reading = await ReadingProgress.create({
      userId: req.session.userId,
      bookId,
      status: status || 'quero_ler',
    });

    res.status(201).json(reading);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Atualiza a página atual de uma leitura.
 */
const updateProgress = async (req, res) => {
  try {
    const { currentPage } = req.body;
    const reading = await readingService.updatePage(req.params.id, currentPage);
    res.json(reading);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Adiciona nota e opinião a uma leitura concluída.
 */
const rateReading = async (req, res) => {
  try {
    const { rating, opinion } = req.body;
    const reading = await ReadingProgress.findByPk(req.params.id);
    if (!reading) return res.status(404).json({ error: 'Leitura não encontrada' });

    await reading.update({ rating, opinion });
    res.json(reading);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Remove uma leitura.
 */
const deleteReading = async (req, res) => {
  try {
    const reading = await ReadingProgress.findByPk(req.params.id);
    if (!reading) return res.status(404).json({ error: 'Leitura não encontrada' });
    await reading.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMyReadings, startReading, updateProgress, rateReading, deleteReading };