const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      unique: true,
      default: () => 'TKT' + Date.now().toString().slice(-8),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    category: {
      type: String,
      enum: ['account', 'transaction', 'loan', 'card', 'investment', 'insurance', 'technical', 'other'],
      default: 'other',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'closed'],
      default: 'open',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    replies: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        senderName: String,
        senderRole: { type: String, enum: ['user', 'admin'] },
        message: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    attachments: [{ name: String, url: String }],
    resolvedAt: { type: Date },
    rating: { type: Number, min: 1, max: 5 },
    feedback: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SupportTicket', supportTicketSchema);
