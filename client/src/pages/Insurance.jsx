import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PLANS = [
  { icon: '❤️', name: 'Health Insurance', desc: 'Cashless hospitalisation at 5000+ network hospitals. Covers family floater.', cover: 'Up to ₹1 Cr', premium: 'from ₹499/mo', type: 'health' },
  { icon: '🛡️', name: 'Life Insurance', desc: 'Term plans with high cover amounts to secure your family\'s financial future.', cover: 'Up to ₹5 Cr', premium: 'from ₹299/mo', type: 'life' },
  { icon: '🚗', name: 'Vehicle Insurance', desc: 'Comprehensive car and bike insurance with zero depreciation cover.', cover: 'Comprehensive', premium: 'from ₹2,999/yr', type: 'vehicle' },
  { icon: '✈️', name: 'Travel Insurance', desc: 'Protect your trips with coverage for medical, baggage loss, and delays.', cover: 'Global Coverage', premium: 'from ₹149/trip', type: 'travel' },
  { icon: '🏠', name: 'Home Insurance', desc: 'Protect your home and belongings from fire, theft, and natural disasters.', cover: 'Up to ₹2 Cr', premium: 'from ₹999/yr', type: 'home' },
];

export default function Insurance() {
  return (
    <div>
      <section className="bg-gradient-navy py-24 pt-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-5xl font-extrabold text-white mb-4">
              Complete <span className="gradient-text-light">Insurance Cover</span>
            </h1>
            <p className="text-white/65 text-lg max-w-xl mx-auto">
              Protect what matters most with our comprehensive insurance plans at India's best rates.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="section bg-bg-primary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-lg transition-all"
              >
                <div className="text-4xl mb-3">{plan.icon}</div>
                <h3 className="font-bold text-lg text-navy-DEFAULT font-display mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{plan.desc}</p>
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-xs text-gray-400">Max Cover</div><div className="font-bold text-navy-DEFAULT">{plan.cover}</div></div>
                  <div className="text-right"><div className="text-xs text-gray-400">Premium</div><div className="font-bold text-emerald-bank">{plan.premium}</div></div>
                </div>
                <Link to="/register" className="btn btn-primary w-full justify-center">
                  Get Cover <ArrowRight size={15} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
