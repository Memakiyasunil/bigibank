// Stub pages that route to their own sections
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, ArrowRight } from 'lucide-react';

const ACCOUNT_TYPES = [
  { icon: '💰', name: 'Savings Account', rate: '4% p.a.', minBal: '₹0', desc: 'Zero balance savings account with 4% interest.' },
  { icon: '🏢', name: 'Current Account', rate: '0% p.a.', minBal: '₹10,000', desc: 'High transaction limit current account for businesses.' },
  { icon: '🏦', name: 'Fixed Deposit', rate: 'up to 8.5%', minBal: '₹1,000', desc: 'Guaranteed returns with flexible tenure options.' },
  { icon: '🔄', name: 'Recurring Deposit', rate: 'up to 7.5%', minBal: '₹100/mo', desc: 'Build savings habit with monthly recurring deposits.' },
];

export default function Accounts() {
  return (
    <div>
      <section className="bg-gradient-navy py-24 pt-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-5xl font-extrabold text-white mb-4">
              Banking <span className="gradient-text-light">Accounts</span>
            </h1>
            <p className="text-white/65 text-lg max-w-xl mx-auto">
              Open savings, current, FD or RD accounts with zero hassle and the best rates in India.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="section bg-bg-primary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {ACCOUNT_TYPES.map((acc, i) => (
              <motion.div key={acc.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-lg transition-all"
              >
                <div className="text-4xl mb-3">{acc.icon}</div>
                <h3 className="font-bold text-xl text-navy font-display mb-1">{acc.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{acc.desc}</p>
                <div className="flex gap-4 mb-4">
                  <div><div className="text-xs text-gray-400">Interest Rate</div><div className="font-bold text-emerald-bank">{acc.rate}</div></div>
                  <div><div className="text-xs text-gray-400">Min Balance</div><div className="font-bold text-navy">{acc.minBal}</div></div>
                </div>
                <Link to="/register" className="btn btn-primary w-full justify-center">Open Account <ArrowRight size={15} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
