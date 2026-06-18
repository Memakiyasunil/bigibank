const express = require('express');
const router = express.Router();
const { getDashboardStats, getUsers, updateUserStatus, getAllLoans, approveLoan, getAllTransactions, getTickets } = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.use(protect, authorize('admin'));

router.get('/dashboard', getDashboardStats);
router.get('/users', getUsers);
router.patch('/users/:id/status', updateUserStatus);
router.get('/loans', getAllLoans);
router.patch('/loans/:id/approve', approveLoan);
router.get('/transactions', getAllTransactions);
router.get('/tickets', getTickets);

module.exports = router;
