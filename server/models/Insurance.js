const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema(
  {
    policyNumber: {
      type: String,
      unique: true,
      default: () => 'POL' + Date.now().toString().slice(-8),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    insuranceType: {
      type: String,
      enum: ['health', 'life', 'vehicle', 'travel', 'home'],
      required: true,
    },
    planName: { type: String, required: true },
    premium: { type: Number, required: true },
    premiumFrequency: {
      type: String,
      enum: ['monthly', 'quarterly', 'half_yearly', 'yearly'],
      default: 'yearly',
    },
    sumAssured: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['active', 'expired', 'cancelled', 'claimed'],
      default: 'active',
    },
    nominee: {
      name: String,
      relation: String,
      dob: Date,
    },
    claims: [
      {
        claimNumber: String,
        claimDate: Date,
        claimAmount: Number,
        reason: String,
        status: {
          type: String,
          enum: ['submitted', 'under_review', 'approved', 'rejected', 'settled'],
          default: 'submitted',
        },
        documents: [{ name: String, url: String }],
        settledAmount: Number,
        settledDate: Date,
      },
    ],
    documents: [{ name: String, url: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Insurance', insuranceSchema);
