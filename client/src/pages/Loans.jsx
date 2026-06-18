import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Banknote, CheckCircle, ArrowRight, Calculator, FileText, Clock } from 'lucide-react';

const LOAN_TYPES = [
  { icon: '🏠', name: 'Home Loan', rate: '8.5%', maxAmount: '₹5 Cr', tenure: '30 yrs', desc: 'Make your dream home a reality with our lowest home loan rates.', type: 'home' },
  { icon: '👤', name: 'Personal Loan', rate: '12.5%', maxAmount: '₹25 Lakh', tenure: '5 yrs', desc: 'Instant personal loans for any purpose — medical, travel, wedding.', type: 'personal' },
  { icon: '🚗', name: 'Vehicle Loan', rate: '9.5%', maxAmount: '₹50 Lakh', tenure: '7 yrs', desc: 'Drive your dream car with our competitive vehicle loan rates.', type: 'vehicle' },
  { icon: '🎓', name: 'Education Loan', rate: '10.5%', maxAmount: '₹40 Lakh', tenure: '15 yrs', desc: 'Invest in your future with hassle-free education financing.', type: 'education' },
  { icon: '🏢', name: 'Business Loan', rate: '14.0%', maxAmount: '₹2 Cr', tenure: '10 yrs', desc: 'Scale your business with quick and flexible business loans.', type: 'business' },
];

const FEATURES = [
  { icon: Calculator, text: 'Instant EMI Calculator' },
  { icon: CheckCircle, text: 'Online Application' },
  { icon: Clock, text: '48-Hour Approval' },
  { icon: FileText, text: 'Minimal Documentation' },
];

export default function Loans() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-navy py-24 pt-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-gold-DEFAULT text-sm font-semibold mb-6">
              <Banknote size={14} />
              Loan Services
            </span>
            <h1 className="font-display text-5xl font-extrabold text-white mb-4">
              Loans at{' '}
              <span className="gradient-text-light">Unbeatable Rates</span>
            </h1>
            <p className="text-white/65 text-lg max-w-2xl mx-auto mb-8">
              From ₹10,000 to ₹5 Crores — quick approval, minimal documentation, 
              and direct disbursement to your account.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/loans/apply" className="btn btn-gold btn-lg">
                Apply Now <ArrowRight size={18} />
              </Link>
              <Link to="/calculators" className="btn btn-outline-white btn-lg">
                EMI Calculator
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm font-semibold text-navy-DEFAULT">
                <Icon size={18} className="text-royal-DEFAULT" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Cards */}
      <section className="section bg-bg-primary">
        <div className="container mx-auto px-6">
          <h2 className="section-title text-center mb-12">Choose Your Loan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOAN_TYPES.map((loan, i) => (
              <motion.div
                key={loan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-lg transition-all group"
              >
                <div className="text-4xl mb-4">{loan.icon}</div>
                <h3 className="font-bold text-xl text-navy-DEFAULT font-display mb-1">{loan.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{loan.desc}</p>
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[
                    { label: 'Rate', value: loan.rate },
                    { label: 'Max', value: loan.maxAmount },
                    { label: 'Tenure', value: loan.tenure },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center p-2 bg-gray-50 rounded-xl">
                      <div className="font-bold text-navy-DEFAULT text-sm">{value}</div>
                      <div className="text-gray-400 text-xs">{label}</div>
                    </div>
                  ))}
                </div>
                <Link to={`/loans/apply?type=${loan.type}`} className="btn btn-primary w-full justify-center">
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
