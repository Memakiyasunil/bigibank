import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CARDS = [
  { icon: '💎', name: 'BigiBank Platinum', type: 'credit', limit: '₹10 Lakh', rewards: '5X points', cashback: '2% on all spends', color: 'from-gray-700 to-gray-900', accent: '#9CA3AF' },
  { icon: '🥇', name: 'BigiBank Gold', type: 'credit', limit: '₹5 Lakh', rewards: '3X points', cashback: '1.5% on all spends', color: 'from-amber-600 to-yellow-700', accent: '#FFC107' },
  { icon: '💳', name: 'BigiBank Classic', type: 'debit', limit: '₹2 Lakh/day', rewards: '1X points', cashback: '0.5% on online', color: 'from-navy-DEFAULT to-royal-dark', accent: '#0066FF' },
  { icon: '📱', name: 'Virtual Card', type: 'virtual', limit: '₹50,000', rewards: '2X online', cashback: '1% online cashback', color: 'from-purple-700 to-purple-900', accent: '#8B5CF6' },
];

export default function Cards() {
  return (
    <div>
      <section className="bg-gradient-navy py-24 pt-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-5xl font-extrabold text-white mb-4">
              Premium <span className="gradient-text-light">Banking Cards</span>
            </h1>
            <p className="text-white/65 text-lg max-w-xl mx-auto">
              Exclusive credit and debit cards with unmatched rewards, cashback, and global acceptance.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="section bg-bg-primary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CARDS.map((card, i) => (
              <motion.div key={card.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-lg transition-all"
              >
                {/* Mini Card Visual */}
                <div className={`bank-card bg-gradient-to-br ${card.color} mb-6 w-full max-w-xs mx-auto`} style={{ height: '160px' }}>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-8 h-5 bg-gold-DEFAULT/60 rounded" />
                    <span className="text-white/60 text-xs font-mono uppercase">{card.type}</span>
                  </div>
                  <div className="text-white/80 font-mono text-xs tracking-widest">**** **** **** 0000</div>
                  <div className="mt-3 font-semibold text-white text-sm">{card.name}</div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Limit', value: card.limit },
                    { label: 'Rewards', value: card.rewards },
                    { label: 'Cashback', value: card.cashback },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center p-2 bg-gray-50 rounded-xl">
                      <div className="font-bold text-navy-DEFAULT text-xs">{value}</div>
                      <div className="text-gray-400 text-xs">{label}</div>
                    </div>
                  ))}
                </div>
                <Link to="/register" className="btn btn-primary w-full justify-center">
                  Apply Now <ArrowRight size={15} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
