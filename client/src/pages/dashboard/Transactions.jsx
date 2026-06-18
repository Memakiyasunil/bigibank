import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { accountAPI } from '../../services/api';
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft, Clock, Shield } from 'lucide-react';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTxns = async () => {
      try {
        const res = await accountAPI.getTransactions();
        setTransactions(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTxns();
  }, []);

  const filteredTxns = transactions.filter(t => 
    t.description?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-navy">Transaction History</h2>
          <p className="text-gray-500 text-sm mt-1">View and download your recent account activity</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-outline btn-sm">
            <Filter size={16} /> Filter
          </button>
          <button className="btn btn-primary btn-sm">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex items-center gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by description or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-royal/20 focus:border-royal outline-none transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-8 flex flex-col gap-4">
            <div className="skeleton h-12 w-full"></div>
            <div className="skeleton h-12 w-full"></div>
            <div className="skeleton h-12 w-full"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Transaction</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredTxns.map((txn) => (
                  <tr key={txn._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${txn.type === 'credit' ? 'bg-emerald-50 text-emerald-bank' : 'bg-red-50 text-red-500'}`}>
                          {txn.type === 'credit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                        </div>
                        <div>
                          <p className="font-semibold text-navy">{txn.description}</p>
                          <p className="text-xs text-gray-400">Ref: {txn._id.slice(-8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="badge badge-navy capitalize">{txn.category}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(txn.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                      <br/>
                      {new Date(txn.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${txn.status === 'completed' ? 'badge-success' : 'badge-warning'} capitalize flex items-center gap-1 w-max`}>
                        {txn.status === 'completed' ? <Shield size={12}/> : <Clock size={12}/>}
                        {txn.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right font-bold ${txn.type === 'credit' ? 'text-emerald-bank' : 'text-navy'}`}>
                      {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredTxns.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                No transactions found matching your search.
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
