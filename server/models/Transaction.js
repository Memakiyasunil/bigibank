const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      unique: true,
      default: () => 'TXN' + Date.now().toString() + Math.floor(Math.random() * 1000),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    toAccountNumber: { type: String },
    amount: {
      type: Number,
      required: true,
      min: [1, 'Amount must be at least 1'],
    },
    type: {
      type: String,
      enum: ['credit', 'debit', 'transfer', 'payment', 'refund'],
      required: true,
    },
    category: {
      type: String,
      enum: ['shopping', 'food', 'transport', 'utilities', 'entertainment', 'health', 'education', 'salary', 'investment', 'loan', 'insurance', 'other'],
      default: 'other',
    },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'reversed'],
      default: 'completed',
    },
    balanceAfter: { type: Number },
    upiId: { type: String },
    referenceNumber: { type: String },
    isFlagged: { type: Boolean, default: false },
    flagReason: { type: String },
  },
  { timestamps: true }
);

transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index({ fromAccount: 1 });
transactionSchema.index({ status: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);
