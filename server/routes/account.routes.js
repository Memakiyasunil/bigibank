const express = require('express');
const router = express.Router();
const { getAccounts, getAccountById, createAccount, getTransactions, transfer } = require('../controllers/account.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.get('/', getAccounts);
router.post('/', createAccount);
router.get('/:id', getAccountById);
router.get('/:id/transactions', getTransactions);
router.post('/transfer', transfer);

module.exports = router;
