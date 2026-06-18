const Loan = require('../models/Loan');
const Notification = require('../models/Notification');

const INTEREST_RATES = {
  personal: 12.5,
  home: 8.5,
  vehicle: 9.5,
  education: 10.5,
  business: 14.0,
};

// @route GET /api/loans
const getLoans = async (req, res, next) => {
  try {
    const loans = await Loan.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: loans });
  } catch (error) { next(error); }
};

// @route GET /api/loans/:id
const getLoanById = async (req, res, next) => {
  try {
    const loan = await Loan.findOne({ _id: req.params.id, userId: req.user.id });
    if (!loan) return res.status(404).json({ success: false, message: 'Loan not found.' });
    res.status(200).json({ success: true, data: loan });
  } catch (error) { next(error); }
};

// @route POST /api/loans/apply
const applyLoan = async (req, res, next) => {
  try {
    const { loanType, amount, tenure, purpose, employmentType, monthlyIncome } = req.body;

    if (!loanType || !amount || !tenure) {
      return res.status(400).json({ success: false, message: 'Loan type, amount, and tenure are required.' });
    }

    const interestRate = INTEREST_RATES[loanType] || 12;

    const loan = await Loan.create({
      userId: req.user.id,
      loanType,
      amount,
      tenure,
      interestRate,
      purpose,
      employmentType,
      monthlyIncome,
      status: 'submitted',
    });

    await Notification.create({
      userId: req.user.id,
      title: 'Loan Application Submitted',
      message: `Your ${loanType} loan application for ₹${amount.toLocaleString()} has been submitted.`,
      type: 'loan',
    });

    res.status(201).json({ success: true, message: 'Loan application submitted!', data: loan });
  } catch (error) { next(error); }
};

// @route GET /api/loans/calculate-emi
const calculateEMI = async (req, res) => {
  const { amount, tenure, interestRate } = req.query;
  const r = parseFloat(interestRate) / 12 / 100;
  const n = parseInt(tenure);
  const p = parseFloat(amount);

  const emi = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - p;

  res.status(200).json({
    success: true,
    data: {
      emi: Math.round(emi * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      principal: p,
    },
  });
};

// @route GET /api/loans/interest-rates
const getInterestRates = async (req, res) => {
  res.status(200).json({ success: true, data: INTEREST_RATES });
};

module.exports = { getLoans, getLoanById, applyLoan, calculateEMI, getInterestRates };
