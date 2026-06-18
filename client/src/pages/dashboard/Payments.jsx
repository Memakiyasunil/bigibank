import React from 'react';
import { motion } from 'framer-motion';
import { Send, Zap, Smartphone, Globe, Copy, CheckCircle, ArrowRight } from 'lucide-react';

const recentPayees = [
  { name: 'Sarah Connor', initials: 'SC', color: 'from-pink-500 to-rose-500', time: '2 hours ago' },
  { name: 'John Doe', initials: 'JD', color: 'from-blue-500 to-cyan-500', time: 'Yesterday' },
  { name: 'Alice Smith', initials: 'AS', color: 'from-emerald-500 to-teal-500', time: '3 days ago' }
];

export default function Payments() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-navy">Payments & Transfers</h2>
          <p className="text-gray-500 text-sm mt-1">Send money quickly and securely</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Action Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-navy mb-6">Quick Transfer</h3>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <button className="flex-1 min-w-[120px] bg-royal text-white rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-royal-dark transition-colors shadow-md shadow-royal/20">
                <Send size={24} />
                <span className="text-sm font-semibold">Bank Transfer</span>
              </button>
              <button className="flex-1 min-w-[120px] bg-gray-50 text-navy rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-100 transition-colors border border-gray-200">
                <Zap size={24} className="text-amber-500" />
                <span className="text-sm font-semibold">UPI Payment</span>
              </button>
              <button className="flex-1 min-w-[120px] bg-gray-50 text-navy rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-100 transition-colors border border-gray-200">
                <Globe size={24} className="text-blue-500" />
                <span className="text-sm font-semibold">International</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="input-group">
                <label className="text-sm font-semibold text-gray-700">Amount (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">₹</span>
                  <input type="number" className="input-field pl-8 font-display font-bold text-xl h-14" placeholder="0.00" />
                </div>
              </div>
              
              <div className="input-group">
                <label className="text-sm font-semibold text-gray-700">Recipient Account / UPI ID</label>
                <input type="text" className="input-field h-14" placeholder="Enter details..." />
              </div>

              <button className="btn btn-primary w-full h-14 mt-4 text-lg">
                Proceed to Pay <ArrowRight size={20}/>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-navy to-royal-dark rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
             <h3 className="font-bold mb-4 flex items-center gap-2 relative z-10"><Smartphone size={20}/> My UPI ID</h3>
             <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 flex items-center justify-between relative z-10">
               <span className="font-mono tracking-wider">user@bigibank</span>
               <button className="text-white/60 hover:text-white transition-colors"><Copy size={16}/></button>
             </div>
             <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=user@bigibank&pn=User&cu=INR" alt="UPI QR" className="w-32 h-32 mx-auto mt-6 rounded-xl bg-white p-2 relative z-10" />
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-navy mb-4">Recent Payees</h3>
            <div className="space-y-4">
              {recentPayees.map((payee, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${payee.color} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                      {payee.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-navy group-hover:text-royal transition-colors">{payee.name}</p>
                      <p className="text-xs text-gray-400">{payee.time}</p>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-royal/10 group-hover:text-royal transition-colors">
                    <Send size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
