const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/auth');
const {
  getMyReadings,
  startReading,
  updateProgress,
  rateReading,
  deleteReading,
  downloadReport,
} = require('../controllers/readingController');

router.use(requireAuth);

router.get('/', getMyReadings);
router.post('/', startReading);
router.patch('/:id/progress', updateProgress);
router.patch('/:id/rate', rateReading);
router.delete('/:id', deleteReading);
router.get('/report/pdf', downloadReport);

module.exports = router;