const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const Notification = require('../models/Notification');

// @route GET /api/accounts
const getAccounts = async (req, res, next) => {
  try {
    const accounts = await Account.find({ userId: req.user.id, status: { $ne: 'closed' } });
    res.status(200).json({ success: true, data: accounts });
  } catch (error) { next(error); }
};

// @route GET /api/accounts/:id
const getAccountById = async (req, res, next) => {
  try {
    const account = await Account.findOne({ _id: req.params.id, userId: req.user.id });
    if (!account) return res.status(404).json({ success: false, message: 'Account not found.' });
    res.status(200).json({ success: true, data: account });
  } catch (error) { next(error); }
};

// @route POST /api/accounts
const createAccount = async (req, res, next) => {
  try {
    const { accountType, depositAmount, tenure } = req.body;
    const account = await Account.create({
      userId: req.user.id,
      accountType,
      depositAmount,
      tenure,
      balance: depositAmount || 0,
      maturityDate: tenure ? new Date(Date.now() + tenure * 30 * 24 * 60 * 60 * 1000) : undefined,
    });
    res.status(201).json({ success: true, message: 'Account created!', data: account });
  } catch (error) { next(error); }
};

// @route GET /api/accounts/:id/transactions
const getTransactions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const query = { userId: req.user.id };
    if (req.params.id !== 'all') {
      query.$or = [{ fromAccount: req.params.id }, { toAccount: req.params.id }];
    }

    const transactions = await Transaction.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Transaction.countDocuments(query);

    res.status(200).json({
      success: true,
      data: transactions,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) { next(error); }
};

// @route POST /api/accounts/transfer
const transfer = async (req, res, next) => {
  try {
    const { fromAccountId, toAccountNumber, amount, description } = req.body;

    if (!fromAccountId || !toAccountNumber || !amount) {
      return res.status(400).json({ success: false, message: 'From account, to account, and amount are required.' });
    }

    if (amount <= 0) {
      return res.status(400).json({ success: false, message: 'Amount must be greater than 0.' });
    }

    const fromAccount = await Account.findOne({ _id: fromAccountId, userId: req.user.id, status: 'active' });
    if (!fromAccount) return res.status(404).json({ success: false, message: 'Source account not found.' });

    if (fromAccount.balance < amount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance.' });
    }

    const toAccount = await Account.findOne({ accountNumber: toAccountNumber, status: 'active' });
    if (!toAccount) return res.status(404).json({ success: false, message: 'Destination account not found.' });

    if (fromAccount._id.toString() === toAccount._id.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot transfer to the same account.' });
    }

    // Deduct from sender
    fromAccount.balance -= amount;
    await fromAccount.save();

    // Credit to receiver
    toAccount.balance += amount;
    await toAccount.save();

    // Create transactions
    const debitTxn = await Transaction.create({
      userId: req.user.id,
      fromAccount: fromAccountId,
      toAccount: toAccount._id,
      toAccountNumber,
      amount,
      type: 'debit',
      category: 'other',
      description: description || `Transfer to ${toAccountNumber}`,
      status: 'completed',
      balanceAfter: fromAccount.balance,
    });

    await Transaction.create({
      userId: toAccount.userId,
      fromAccount: fromAccountId,
      toAccount: toAccount._id,
      amount,
      type: 'credit',
      category: 'other',
      description: description || `Transfer from ${fromAccount.accountNumber}`,
      status: 'completed',
      balanceAfter: toAccount.balance,
    });

    // Notification for sender
    await Notification.create({
      userId: req.user.id,
      title: 'Transfer Successful',
      message: `₹${amount} transferred to account ${toAccountNumber}`,
      type: 'transaction',
    });

    res.status(200).json({
      success: true,
      message: 'Transfer successful!',
      data: debitTxn,
      newBalance: fromAccount.balance,
    });
  } catch (error) { next(error); }
};

module.exports = { getAccounts, getAccountById, createAccount, getTransactions, transfer };
