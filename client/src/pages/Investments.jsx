import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const INVESTMENTS = [
  { icon: '📊', name: 'Mutual Funds', returns: '12-18%', type: 'mutual_fund', risk: 'Medium', minAmount: '₹500', desc: 'Diversified portfolio managed by expert fund managers.' },
  { icon: '📈', name: 'Stocks & Trading', returns: 'Market-linked', type: 'stocks', risk: 'High', minAmount: '₹1', desc: 'Invest in BSE/NSE listed companies with real-time tracking.' },
  { icon: '🔄', name: 'SIP Plans', returns: '10-15%', type: 'sip', risk: 'Medium', minAmount: '₹500/mo', desc: 'Systematic Investment Plans for disciplined wealth building.' },
  { icon: '🥇', name: 'Digital Gold', returns: '8-12%', type: 'gold', risk: 'Low', minAmount: '₹100', desc: 'Invest in 24K pure digital gold, buy/sell anytime.' },
  { icon: '🏦', name: 'Fixed Deposits', returns: '7-8.5%', type: 'fd', risk: 'Low', minAmount: '₹1,000', desc: 'Guaranteed returns with complete capital protection.' },
  { icon: '🏖️', name: 'Retirement Plans', returns: '9-11%', type: 'retirement', risk: 'Low-Med', minAmount: '₹1,000', desc: 'Secure your golden years with our NPS and pension plans.' },
];

export default function Investments() {
  return (
    <div>
      <section className="bg-gradient-navy py-24 pt-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-5xl font-extrabold text-white mb-4">
              Grow Your <span className="gradient-text-light">Wealth</span>
            </h1>
            <p className="text-white/65 text-lg max-w-xl mx-auto">
              Expert-curated investment products to build lasting wealth and achieve your financial goals.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="section bg-bg-primary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INVESTMENTS.map((inv, i) => (
              <motion.div key={inv.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-lg transition-all"
              >
                <div className="text-4xl mb-3">{inv.icon}</div>
                <h3 className="font-bold text-lg text-navy font-display mb-1">{inv.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{inv.desc}</p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs text-gray-400">Expected Returns</div>
                    <div className="font-bold text-emerald-bank">{inv.returns}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Min Amount</div>
                    <div className="font-bold text-navy">{inv.minAmount}</div>
                  </div>
                </div>
                <span className={`badge mb-4 ${inv.risk === 'Low' ? 'badge-success' : inv.risk === 'High' ? 'badge-danger' : 'badge-warning'}`}>
                  {inv.risk} Risk
                </span>
                <Link to="/login" className="btn btn-primary w-full justify-center mt-2">
                  Start Investing <ArrowRight size={15} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
