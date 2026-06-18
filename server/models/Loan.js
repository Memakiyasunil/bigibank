const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      unique: true,
      default: () => 'LOAN' + Date.now().toString().slice(-8),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    loanType: {
      type: String,
      enum: ['personal', 'home', 'vehicle', 'education', 'business'],
      required: true,
    },
    amount: { type: Number, required: true, min: 1000 },
    tenure: { type: Number, required: true }, // months
    interestRate: { type: Number, required: true }, // annual %
    emiAmount: { type: Number },
    processingFee: { type: Number, default: 0 },
    purpose: { type: String },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'disbursed', 'closed'],
      default: 'draft',
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    approvedAmount: { type: Number },
    disbursedDate: { type: Date },
    disbursedToAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    documents: [
      {
        name: String,
        url: String,
        uploadedAt: { type: Date, default: Date.now },
        status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
      },
    ],
    remarks: { type: String },
    rejectionReason: { type: String },
    employmentType: {
      type: String,
      enum: ['salaried', 'self_employed', 'business', 'student', 'retired'],
    },
    monthlyIncome: { type: Number },
    creditScore: { type: Number },
    // EMI payment tracking
    emis: [
      {
        dueDate: Date,
        amount: Number,
        paidDate: Date,
        status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' },
      },
    ],
  },
  { timestamps: true }
);

// Calculate EMI before save
loanSchema.pre('save', function (next) {
  if (this.amount && this.tenure && this.interestRate) {
    const r = this.interestRate / 12 / 100;
    const n = this.tenure;
    if (r === 0) {
      this.emiAmount = this.amount / n;
    } else {
      this.emiAmount = (this.amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    this.emiAmount = Math.round(this.emiAmount * 100) / 100;
  }
  next();
});

module.exports = mongoose.model('Loan', loanSchema);
