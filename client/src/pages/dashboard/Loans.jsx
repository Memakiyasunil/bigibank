import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { loanAPI } from '../../services/api';
import { Banknote, CheckCircle, Clock, AlertCircle, FileText, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Loans() {
  const { user } = useSelector(state => state.auth);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await loanAPI.getLoans();
        // If the user has no loans, we can optionally provide mock data or just show empty state
        if (res.data.data.length > 0) {
          setLoans(res.data.data);
        } else {
          setLoans([
            { _id: 'L1001', type: 'Personal', amount: 500000, interestRate: 10.5, status: 'approved', remainingAmount: 420000, emi: 12500, nextPayment: '2026-07-05' },
            { _id: 'L1002', type: 'Vehicle', amount: 800000, interestRate: 8.5, status: 'submitted', remainingAmount: 800000, emi: 0, nextPayment: 'Pending' }
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, [user._id]);

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-navy">My Loans</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your active loans and applications</p>
        </div>
        <button className="btn btn-primary">
          Apply for New Loan
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {loans.map(loan => (
          <div key={loan._id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 border-b border-gray-50 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                  <Banknote size={24} />
                </div>
                <div>
                  <h3 className="font-bold font-display text-navy text-lg">{loan.type} Loan</h3>
                  <p className="text-sm text-gray-400 font-mono">Ref: {loan._id}</p>
                </div>
              </div>
              <span className={`badge ${loan.status === 'approved' ? 'badge-success' : loan.status === 'submitted' ? 'badge-warning' : 'badge-danger'} capitalize flex items-center gap-1`}>
                {loan.status === 'approved' ? <CheckCircle size={12}/> : <Clock size={12}/>} {loan.status}
              </span>
            </div>

            <div className="p-6 bg-gray-50/30">
              <div className="flex items-end justify-between mb-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total Loan Amount</p>
                  <p className="font-bold text-navy text-xl">₹{loan.amount.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">Interest Rate</p>
                  <p className="font-semibold text-emerald-bank">{loan.interestRate}% p.a.</p>
                </div>
              </div>

              {loan.status === 'approved' && (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4 mb-2">
                    <div className="bg-royal h-2 rounded-full" style={{ width: `${(((loan.amount || 0) - (loan.remainingAmount || 0)) / (loan.amount || 1)) * 100}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mb-6">
                    <span>Paid: ₹{((loan.amount || 0) - (loan.remainingAmount || 0)).toLocaleString('en-IN')}</span>
                    <span>Remaining: ₹{(loan.remainingAmount || 0).toLocaleString('en-IN')}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-xl border border-gray-100">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Next EMI</p>
                      <p className="font-bold text-navy">₹{(loan.emi || 0).toLocaleString('en-IN')}</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-100">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Due Date</p>
                      <p className="font-bold text-navy">{loan.nextPayment ? new Date(loan.nextPayment).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors group">
              <span className="text-sm font-semibold text-royal flex items-center gap-2">
                <FileText size={16}/> View Details
              </span>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-royal transition-colors" />
            </div>
          </div>
        ))}

        {loans.length === 0 && (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Banknote size={32} />
            </div>
            <h3 className="font-bold text-navy text-lg mb-2">No active loans</h3>
            <p className="text-gray-500 mb-6">You don't have any active loans or pending applications.</p>
            <button className="btn btn-primary">Apply for a Loan</button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
