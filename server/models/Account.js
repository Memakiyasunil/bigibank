const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accountNumber: {
      type: String,
      unique: true,
      default: () => 'BIGI' + Date.now().toString().slice(-10),
    },
    accountType: {
      type: String,
      enum: ['savings', 'current', 'fd', 'rd'],
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
      min: [0, 'Balance cannot be negative'],
    },
    currency: { type: String, default: 'INR' },
    interestRate: { type: Number, default: 3.5 },
    status: {
      type: String,
      enum: ['active', 'inactive', 'frozen', 'closed'],
      default: 'active',
    },
    nominee: {
      name: String,
      relation: String,
      phone: String,
    },
    // For FD/RD
    maturityDate: { type: Date },
    depositAmount: { type: Number },
    tenure: { type: Number }, // months
  },
  { timestamps: true }
);

module.exports = mongoose.model('Account', accountSchema);
