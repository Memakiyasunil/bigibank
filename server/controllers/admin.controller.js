const User = require('../models/User');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const Loan = require('../models/Loan');
const Investment = require('../models/Investment');
const Insurance = require('../models/Insurance');
const SupportTicket = require('../models/SupportTicket');
const Notification = require('../models/Notification');

// @route GET /api/admin/dashboard
const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalUsers, activeUsers, totalAccounts, totalLoans,
      pendingLoans, totalTransactions, totalInvestments, openTickets,
    ] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      User.countDocuments({ role: 'user', isActive: true }),
      Account.countDocuments(),
      Loan.countDocuments(),
      Loan.countDocuments({ status: 'submitted' }),
      Transaction.countDocuments(),
      Investment.countDocuments({ status: 'active' }),
      SupportTicket.countDocuments({ status: 'open' }),
    ]);

    // Total transaction volume
    const volumeResult = await Transaction.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const totalVolume = volumeResult[0]?.total || 0;

    // Flagged transactions
    const flaggedTxns = await Transaction.countDocuments({ isFlagged: true });

    // Monthly registrations (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyUsers = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo }, role: 'user' } },
      { $group: { _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        totalAccounts,
        totalLoans,
        pendingLoans,
        totalTransactions,
        totalInvestments,
        openTickets,
        totalVolume,
        flaggedTxns,
        monthlyUsers,
      },
    });
  } catch (error) { next(error); }
};

// @route GET /api/admin/users
const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const skip = (page - 1) * limit;

    const query = { role: 'user' };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(query).select('-password').sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      data: users,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) { next(error); }
};

// @route PATCH /api/admin/users/:id/status
const updateUserStatus = async (req, res, next) => {
  try {
    const { isActive } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { isActive }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    res.status(200).json({ success: true, message: `User ${isActive ? 'activated' : 'deactivated'}.`, data: user });
  } catch (error) { next(error); }
};

// @route GET /api/admin/loans
const getAllLoans = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const loans = await Loan.find(query)
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Loan.countDocuments(query);

    res.status(200).json({
      success: true,
      data: loans,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) },
    });
  } catch (error) { next(error); }
};

// @route PATCH /api/admin/loans/:id/approve
const approveLoan = async (req, res, next) => {
  try {
    const { status, approvedAmount, remarks } = req.body;
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { status, approvedAmount, approvedBy: req.user.id, remarks, disbursedDate: status === 'disbursed' ? new Date() : undefined },
      { new: true }
    ).populate('userId', 'name email');

    if (!loan) return res.status(404).json({ success: false, message: 'Loan not found.' });

    // Notify user
    await Notification.create({
      userId: loan.userId._id,
      title: `Loan ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      message: `Your loan application has been ${status}. ${remarks || ''}`,
      type: 'loan',
    });

    res.status(200).json({ success: true, message: `Loan ${status}`, data: loan });
  } catch (error) { next(error); }
};

// @route GET /api/admin/transactions
const getAllTransactions = async (req, res, next) => {
  try {
    const { flagged, page = 1, limit = 20 } = req.query;
    const query = flagged === 'true' ? { isFlagged: true } : {};
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const transactions = await Transaction.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Transaction.countDocuments(query);

    res.status(200).json({
      success: true,
      data: transactions,
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
    });
  } catch (error) { next(error); }
};

// @route GET /api/admin/tickets
const getTickets = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const tickets = await SupportTicket.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tickets });
  } catch (error) { next(error); }
};

module.exports = { getDashboardStats, getUsers, updateUserStatus, getAllLoans, approveLoan, getAllTransactions, getTickets };
