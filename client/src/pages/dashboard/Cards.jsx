import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ShieldAlert, Lock, Snowflake, Eye, EyeOff, Settings } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Cards() {
  const { user } = useSelector(state => state.auth);
  const [showCardNumber, setShowCardNumber] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display text-navy">My Cards</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your virtual and physical cards</p>
        </div>
        <button className="btn btn-outline btn-sm">
          <Settings size={16} /> Manage Limits
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Card Display */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bank-card bank-card-visa w-full h-[220px] shadow-2xl relative overflow-hidden group">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transform: 'skewX(-20deg) translateX(-150%)' }} />
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <span className="font-display font-bold italic text-xl">BigiBank</span>
              <svg className="w-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.9572 15.6146L14.0747 31H9.86603L12.551 15.6146H19.9572ZM36.1953 15.6146L30.3129 31H26.1042L28.7891 15.6146H36.1953Z" fill="white"/>
                <path d="M42.4335 15.6146L36.551 31H32.3423L35.0273 15.6146H42.4335Z" fill="white" opacity="0.6"/>
              </svg>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xl tracking-widest text-white/90">
                  {showCardNumber ? '4532 8810 9923 1045' : '•••• •••• •••• 1045'}
                </p>
                <button onClick={() => setShowCardNumber(!showCardNumber)} className="text-white/60 hover:text-white">
                  {showCardNumber ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>

              <div className="flex justify-between items-end text-sm text-white/80 uppercase tracking-widest">
                <div>
                  <p className="text-[10px] text-white/50 mb-0.5">Card Holder</p>
                  <p className="font-semibold">{user?.name || 'Valued Client'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/50 mb-0.5">Expires</p>
                  <p className="font-semibold">12/28</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xs text-gray-400">Card Status</p>
              <p className="font-semibold text-emerald-bank flex items-center gap-1"><ShieldAlert size={14}/> Active</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Monthly Limit</p>
              <p className="font-bold text-navy">₹1,00,000</p>
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent Usage */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Freeze Card', icon: Snowflake, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'Block Card', icon: Lock, color: 'text-red-500', bg: 'bg-red-50' },
              { label: 'Card Details', icon: CreditCard, color: 'text-royal', bg: 'bg-blue-50' },
              { label: 'Replace Card', icon: ShieldAlert, color: 'text-orange-500', bg: 'bg-orange-50' },
            ].map((action, i) => (
              <button key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group">
                <div className={`w-12 h-12 rounded-full ${action.bg} ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon size={20} />
                </div>
                <span className="text-xs font-semibold text-navy">{action.label}</span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
             <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
               <h3 className="font-bold font-display text-navy">Recent Card Usage</h3>
             </div>
             <div className="p-8 text-center text-gray-400">
               <CreditCard size={48} className="mx-auto mb-3 opacity-20" />
               <p>No recent transactions on this card.</p>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
