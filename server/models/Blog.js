const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    thumbnail: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    authorName: { type: String },
    category: {
      type: String,
      enum: ['banking', 'investment', 'loans', 'insurance', 'market', 'fintech', 'tips'],
      default: 'banking',
    },
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
    readTime: { type: Number, default: 5 }, // minutes
  },
  { timestamps: true }
);

blogSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 200) + '...';
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
