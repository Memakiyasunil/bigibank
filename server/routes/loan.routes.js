const express = require('express');
const router = express.Router();
const { getLoans, getLoanById, applyLoan, calculateEMI, getInterestRates } = require('../controllers/loan.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/interest-rates', getInterestRates);
router.get('/calculate-emi', calculateEMI);
router.use(protect);
router.get('/', getLoans);
router.get('/:id', getLoanById);
router.post('/apply', applyLoan);

module.exports = router;
