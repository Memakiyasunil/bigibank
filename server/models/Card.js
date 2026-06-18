const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    cardType: {
      type: String,
      enum: ['credit', 'debit', 'virtual', 'premium'],
      required: true,
    },
    cardName: { type: String }, // e.g., "BigiBank Platinum"
    cardNumber: { type: String }, // stored masked: **** **** **** 1234
    last4: { type: String },
    expiryMonth: { type: Number },
    expiryYear: { type: Number },
    nameOnCard: { type: String },
    network: {
      type: String,
      enum: ['visa', 'mastercard', 'rupay', 'amex'],
      default: 'visa',
    },
    creditLimit: { type: Number, default: 0 },
    availableLimit: { type: Number, default: 0 },
    billingDate: { type: Number, default: 1 }, // day of month
    dueDate: { type: Number, default: 15 },
    rewards: { type: Number, default: 0 }, // reward points
    cashback: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['active', 'blocked', 'expired', 'cancelled', 'pending'],
      default: 'active',
    },
    isPrimary: { type: Boolean, default: false },
    isContactless: { type: Boolean, default: true },
    isInternational: { type: Boolean, default: false },
    pin: { type: String, select: false }, // hashed
  },
  { timestamps: true }
);

module.exports = mongoose.model('Card', cardSchema);
