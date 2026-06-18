import React from 'react';
import { motion } from 'framer-motion';
import { Shield, HeartPulse, Car, Home, CheckCircle } from 'lucide-react';

const mockPolicies = [
  { id: 'POL-H-1092', type: 'Health Insurance', provider: 'BigiCare Plus', cover: 1000000, premium: 12500, due: '2026-11-15', status: 'Active', icon: HeartPulse, color: 'text-rose-500', bg: 'bg-rose-50' },
  { id: 'POL-V-8832', type: 'Vehicle Insurance', provider: 'AutoSafe Comprehensive', cover: 600000, premium: 8200, due: '2026-08-20', status: 'Active', icon: Car, color: 'text-blue-500', bg: 'bg-blue-50' }
];

export default function Insurance() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-navy">Insurance</h2>
          <p className="text-gray-500 text-sm mt-1">Protect what matters most to you</p>
        </div>
        <button className="btn btn-primary">
          Explore Policies
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {mockPolicies.map(policy => (
          <div key={policy.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow relative group">
            <div className="p-6 border-b border-gray-50 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${policy.bg} ${policy.color} flex items-center justify-center`}>
                  <policy.icon size={28} />
                </div>
                <div>
                  <h3 className="font-bold font-display text-navy text-lg">{policy.type}</h3>
                  <p className="text-sm text-gray-500">{policy.provider}</p>
                </div>
              </div>
              <span className="badge badge-success flex items-center gap-1">
                <CheckCircle size={12}/> {policy.status}
              </span>
            </div>

            <div className="p-6 bg-gray-50/50">
               <div className="grid grid-cols-2 gap-4 mb-4">
                 <div>
                   <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-1">Cover Amount</p>
                   <p className="font-bold text-navy text-xl">₹{policy.cover.toLocaleString('en-IN')}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-1">Annual Premium</p>
                   <p className="font-semibold text-navy text-xl">₹{policy.premium.toLocaleString('en-IN')}</p>
                 </div>
               </div>
               
               <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-gray-100">
                 <div>
                   <p className="text-xs text-gray-400">Next Renewal Date</p>
                   <p className="font-semibold text-navy text-sm">{new Date(policy.due).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                 </div>
                 <button className="text-sm font-bold text-royal hover:text-royal-dark transition-colors">
                   Pay Now
                 </button>
               </div>
            </div>
            
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-navy">
                <Shield size={14} />
              </button>
            </div>
          </div>
        ))}

        <div className="bg-gradient-to-br from-royal/5 to-royal/10 rounded-3xl border border-royal/10 border-dashed flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
          <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-royal mb-4">
            <Home size={28} />
          </div>
          <h3 className="font-bold text-navy text-lg mb-2">Need Home Insurance?</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-xs">Get comprehensive coverage for your home and belongings starting at just ₹299/month.</p>
          <button className="btn btn-outline">Get a Quote</button>
        </div>
      </div>
    </motion.div>
  );
}
