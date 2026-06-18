import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

const POSTS = [
  { slug: 'home-loan-guide-2024', title: 'Complete Guide to Home Loans in India 2024', category: 'loans', readTime: 8, date: 'June 15, 2024', excerpt: 'Everything you need to know about home loan eligibility, interest rates, and tax benefits.' },
  { slug: 'sip-vs-lumpsum', title: 'SIP vs Lump Sum: Which is Better for You?', category: 'investment', readTime: 5, date: 'June 10, 2024', excerpt: 'A data-driven analysis of systematic investment plans vs lump sum investments.' },
  { slug: 'credit-score-improvement', title: '10 Proven Ways to Improve Your CIBIL Score', category: 'banking', readTime: 6, date: 'June 5, 2024', excerpt: 'Boost your credit score with these expert-recommended strategies.' },
  { slug: 'tax-saving-investments', title: 'Best Tax-Saving Investments Under Section 80C', category: 'investment', readTime: 7, date: 'May 30, 2024', excerpt: 'Maximize your tax savings with ELSS, PPF, NPS and other options.' },
  { slug: 'upi-guide', title: 'The Ultimate UPI Guide: Features, Limits & Tips', category: 'banking', readTime: 4, date: 'May 25, 2024', excerpt: 'Master UPI payments with our comprehensive guide for beginners and experts.' },
  { slug: 'term-insurance-guide', title: 'Why Term Insurance is the Best Life Insurance', category: 'insurance', readTime: 6, date: 'May 20, 2024', excerpt: 'Understanding term insurance: coverage, premiums, and how to choose the right plan.' },
];

const CATEGORIES = ['All', 'Banking', 'Loans', 'Investment', 'Insurance', 'Market'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = React.useState('All');

  return (
    <div>
      <section className="bg-gradient-navy py-24 pt-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-5xl font-extrabold text-white mb-4">
              Financial <span className="gradient-text-light">Insights</span>
            </h1>
            <p className="text-white/65 text-lg max-w-xl mx-auto">
              Expert articles, guides, and tips to help you make smarter financial decisions.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="section bg-bg-primary">
        <div className="container mx-auto px-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-royal text-white shadow-royal' : 'bg-white text-navy border border-gray-200 hover:border-royal'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.map((post, i) => (
              <motion.div key={post.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-card-lg transition-all"
              >
                <div className="h-40 bg-gradient-to-br from-navy to-royal-dark flex items-center justify-center">
                  <BookOpen size={48} className="text-white/30" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge badge-info capitalize">{post.category}</span>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <Clock size={11} />{post.readTime} min read
                    </div>
                  </div>
                  <h3 className="font-bold text-navy mb-2 line-clamp-2 font-display">{post.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">{post.date}</span>
                    <Link to={`/blog/${post.slug}`} className="text-royal text-sm font-semibold flex items-center gap-1 hover:underline">
                      Read <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
