import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { accountAPI } from '../../services/api';
import { Building2, ArrowUpRight, ArrowDownLeft, Wallet, Shield, Download } from 'lucide-react';

export default function MyAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await accountAPI.getAccounts();
        setAccounts(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  if (loading) {
    return (
      <div className="p-6">
        <div className="skeleton h-8 w-48 mb-6"></div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="skeleton h-48 w-full"></div>
          <div className="skeleton h-48 w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display text-navy">My Accounts</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your savings and current accounts</p>
        </div>
        <button className="btn btn-primary btn-sm hidden sm:flex">
          <Download size={16} /> Download Statement
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Total Wealth Summary */}
        <div className="bg-gradient-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/4" />
          
          <div className="relative z-10">
            <p className="text-white/70 mb-2 font-medium">Total Available Balance</p>
            <h3 className="font-display text-4xl font-black mb-6">₹{totalBalance.toLocaleString('en-IN')}</h3>
            
            <div className="flex items-center gap-4 border-t border-white/20 pt-4 mt-auto">
              <div>
                <p className="text-white/60 text-xs mb-1">Monthly Inward</p>
                <div className="flex items-center gap-1 text-emerald-bank">
                  <ArrowDownLeft size={16} />
                  <span className="font-bold text-sm">₹45,000</span>
                </div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div>
                <p className="text-white/60 text-xs mb-1">Monthly Outward</p>
                <div className="flex items-center gap-1 text-red-400">
                  <ArrowUpRight size={16} />
                  <span className="font-bold text-sm">₹12,400</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Individual Accounts */}
        <div className="space-y-4">
          {accounts.map(acc => (
            <div key={acc._id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-royal flex items-center justify-center">
                  <Wallet size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-navy capitalize">{acc.accountType} Account</h4>
                  <p className="text-gray-500 text-sm tracking-widest">{acc.accountNumber}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-navy text-lg">₹{acc.balance.toLocaleString('en-IN')}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-bank bg-emerald-50 px-2 py-1 rounded-full mt-1">
                  <Shield size={12} /> Active
                </span>
              </div>
            </div>
          ))}
          {accounts.length === 0 && (
             <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center text-gray-500">
               No accounts found.
             </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
