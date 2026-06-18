import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, PieChart, ArrowUpRight, Plus, Activity, Briefcase } from 'lucide-react';

const mockInvestments = [
  { id: 1, name: 'Growth Mutual Fund', type: 'Mutual Fund', invested: 150000, current: 185000, returns: 23.3 },
  { id: 2, name: 'Fixed Deposit (1yr)', type: 'FD', invested: 500000, current: 525000, returns: 5.0 },
  { id: 3, name: 'Tech ETF', type: 'Stocks', invested: 200000, current: 280000, returns: 40.0 },
];

export default function Investments() {
  const totalInvested = mockInvestments.reduce((sum, i) => sum + i.invested, 0);
  const totalCurrent = mockInvestments.reduce((sum, i) => sum + i.current, 0);
  const totalReturns = ((totalCurrent - totalInvested) / totalInvested) * 100;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-navy">Investments</h2>
          <p className="text-gray-500 text-sm mt-1">Track and grow your wealth portfolio</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} /> New Investment
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Portfolio Summary */}
        <div className="lg:col-span-2 bg-gradient-to-br from-navy to-royal-dark rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
           <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
             <div>
               <p className="text-white/70 mb-2 font-medium">Total Portfolio Value</p>
               <h3 className="font-display text-4xl font-black mb-2">₹{totalCurrent.toLocaleString('en-IN')}</h3>
               <div className="flex items-center gap-2">
                 <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-md text-sm font-bold flex items-center gap-1">
                   <ArrowUpRight size={14}/> {totalReturns.toFixed(2)}%
                 </span>
                 <span className="text-white/60 text-sm">Overall Returns</span>
               </div>
             </div>
             <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
               <p className="text-white/70 text-sm mb-1">Total Invested</p>
               <p className="font-bold text-xl">₹{totalInvested.toLocaleString('en-IN')}</p>
             </div>
           </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <PieChart size={20} />
            </div>
            <h3 className="font-bold text-navy">Asset Allocation</h3>
          </div>
          <div className="space-y-4">
            {['Mutual Funds (40%)', 'Fixed Deposits (35%)', 'Stocks (25%)'].map((label, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{label.split(' ')[0]}</span>
                  <span>{label.split(' ')[1]}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${i === 0 ? 'bg-royal' : i === 1 ? 'bg-emerald-500' : 'bg-purple-500'}`} style={{ width: label.split('(')[1].replace('%)', '%') }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Holdings List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold font-display text-navy flex items-center gap-2">
            <Briefcase size={20} className="text-royal"/> Your Holdings
          </h3>
          <button className="text-sm font-semibold text-royal hover:text-royal-dark transition-colors">View All</button>
        </div>
        <div className="divide-y divide-gray-50">
          {mockInvestments.map(inv => (
            <div key={inv.id} className="p-6 hover:bg-gray-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <Activity size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-navy">{inv.name}</h4>
                  <p className="text-sm text-gray-500">{inv.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-8 text-right">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Invested</p>
                  <p className="font-semibold text-navy">₹{inv.invested.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Current Value</p>
                  <p className="font-bold text-navy">₹{inv.current.toLocaleString('en-IN')}</p>
                </div>
                <div className="w-20 text-right">
                  <span className="inline-flex items-center gap-1 text-emerald-bank bg-emerald-50 px-2 py-1 rounded-md text-xs font-bold">
                    <ArrowUpRight size={12}/> {inv.returns}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
