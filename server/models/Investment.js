const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    investmentType: {
      type: String,
      enum: ['mutual_fund', 'stocks', 'fd', 'rd', 'gold', 'sip'],
      required: true,
    },
    name: { type: String, required: true },
    investedAmount: { type: Number, required: true },
    currentValue: { type: Number, default: 0 },
    returns: { type: Number, default: 0 }, // percentage
    riskLevel: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['active', 'paused', 'matured', 'redeemed'],
      default: 'active',
    },
    startDate: { type: Date, default: Date.now },
    maturityDate: { type: Date },
    // For SIP
    sipAmount: { type: Number },
    sipFrequency: {
      type: String,
      enum: ['monthly', 'quarterly', 'yearly'],
    },
    nextSipDate: { type: Date },
    // For Stocks
    units: { type: Number },
    purchasePrice: { type: Number },
    currentPrice: { type: Number },
    // Transactions history
    transactions: [
      {
        type: { type: String, enum: ['buy', 'sell', 'sip'] },
        amount: Number,
        units: Number,
        price: Number,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Investment', investmentSchema);
