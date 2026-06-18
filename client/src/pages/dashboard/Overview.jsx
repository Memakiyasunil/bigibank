import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  LineElement, PointElement, LinearScale, CategoryScale, Filler,
} from 'chart.js';
import {
  Wallet, TrendingUp, CreditCard, Shield, ArrowUpRight, ArrowDownLeft,
  Send, Plus, MoreHorizontal, Eye, EyeOff, Bell, ArrowRight,
  Building2, Banknote, BarChart3, RefreshCw, XCircle
} from 'lucide-react';
import { accountAPI } from '../../services/api';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, Filler);

const QUICK_ACTIONS = [
  { icon: Send, label: 'Transfer', color: 'bg-blue-100 text-royal', path: '/dashboard/transfer' },
  { icon: Plus, label: 'Add Money', color: 'bg-green-100 text-emerald-bank', path: '/dashboard/deposit' },
  { icon: CreditCard, label: 'Pay Bills', color: 'bg-purple-100 text-purple-600', path: '/dashboard/bills' },
  { icon: BarChart3, label: 'Invest', color: 'bg-amber-100 text-gold-dark', path: '/investments' },
];

const MOCK_TRANSACTIONS = [
  { id: 1, desc: 'Salary Credit - TechCorp Ltd', amount: 85000, type: 'credit', date: 'Today, 9:30 AM', category: 'salary' },
  { id: 2, desc: 'Amazon Shopping', amount: 4200, type: 'debit', date: 'Yesterday, 3:15 PM', category: 'shopping' },
  { id: 3, desc: 'SIP - HDFC Flexi Cap Fund', amount: 10000, type: 'debit', date: 'Jun 16, 10:00 AM', category: 'investment' },
  { id: 4, desc: 'Electricity Bill - MSEDCL', amount: 1850, type: 'debit', date: 'Jun 15, 2:00 PM', category: 'utilities' },
  { id: 5, desc: 'UPI Transfer from Rahul', amount: 5000, type: 'credit', date: 'Jun 14, 6:30 PM', category: 'other' },
];

const MOCK_ACCOUNTS = [
  { _id: '1', accountType: 'savings', accountNumber: 'BIGI0012345678', balance: 482320, status: 'active' },
  { _id: '2', accountType: 'fd', accountNumber: 'BIGI0087654321', balance: 154000, status: 'active' },
];

const spendingData = {
  labels: ['Shopping', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Investment'],
  datasets: [{
    data: [35, 20, 15, 12, 8, 10],
    backgroundColor: ['#0066FF', '#FFC107', '#00C853', '#EF4444', '#8B5CF6', '#F97316'],
    borderWidth: 0,
    hoverOffset: 8,
  }],
};

const balanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Balance (₹)',
    data: [320000, 385000, 342000, 420000, 458000, 482320],
    fill: true,
    borderColor: '#0066FF',
    backgroundColor: 'rgba(0, 102, 255, 0.08)',
    tension: 0.4,
    pointBackgroundColor: '#0066FF',
    pointRadius: 5,
    pointHoverRadius: 7,
  }],
};

const chartOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: {
    y: {
      grid: { color: 'rgba(0,0,0,0.04)' },
      ticks: {
        callback: (v) => '₹' + (v / 1000).toFixed(0) + 'k',
        font: { size: 11 },
      },
    },
    x: { grid: { display: false }, ticks: { font: { size: 11 } } },
  },
};

const doughnutOptions = {
  responsive: true,
  cutout: '72%',
  plugins: {
    legend: { position: 'right', labels: { font: { size: 11 }, boxWidth: 12, padding: 16 } },
  },
};

export default function Overview() {
  const { user } = useSelector((state) => state.auth);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showBalance, setShowBalance] = useState(true);
  const [loading, setLoading] = useState(true);

  // Transfer Modal State
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferData, setTransferData] = useState({ toAccountNumber: '', amount: '', description: '' });
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferError, setTransferError] = useState('');
  const [transferSuccess, setTransferSuccess] = useState('');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [accRes, txnRes] = await Promise.all([
        accountAPI.getAccounts(),
        accountAPI.getTransactions()
      ]);
      const fetchedAccounts = accRes.data.data;
      setAccounts(fetchedAccounts);
      if (fetchedAccounts.length > 0 && !selectedAccount) {
        setSelectedAccount(fetchedAccounts[0]);
      }
      setTransactions(txnRes.data.data.slice(0, 5)); // Just get 5 recent ones
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setTransferLoading(true);
    setTransferError('');
    setTransferSuccess('');
    try {
      await accountAPI.transfer({
        fromAccountId: selectedAccount._id,
        toAccountNumber: transferData.toAccountNumber,
        amount: Number(transferData.amount),
        description: transferData.description
      });
      setTransferSuccess('Transfer successful!');
      setTransferData({ toAccountNumber: '', amount: '', description: '' });
      fetchDashboardData(); // refresh data
      setTimeout(() => {
        setIsTransferModalOpen(false);
        setTransferSuccess('');
      }, 2000);
    } catch (error) {
      setTransferError(error.response?.data?.message || 'Transfer failed');
    } finally {
      setTransferLoading(false);
    }
  };

  if (loading && accounts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-royal border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6 relative">
      {/* Transfer Modal Overlay */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="bg-white rounded-3xl p-6 lg:p-8 w-full max-w-md shadow-2xl relative"
          >
            <button 
              onClick={() => setIsTransferModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <XCircle size={24} />
            </button>
            <h3 className="font-display font-bold text-xl text-navy mb-4">Send Money</h3>
            
            {transferError && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">{transferError}</div>}
            {transferSuccess && <div className="mb-4 p-3 bg-green-50 text-emerald-bank rounded-lg text-sm border border-green-100">{transferSuccess}</div>}

            <form onSubmit={handleTransfer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Account</label>
                <select 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal transition-all"
                  value={selectedAccount?._id || ''}
                  onChange={(e) => setSelectedAccount(accounts.find(a => a._id === e.target.value))}
                >
                  {accounts.map(acc => (
                    <option key={acc._id} value={acc._id}>
                      {acc.accountType.toUpperCase()} - {acc.accountNumber} (₹{acc.balance.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Account Number</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal transition-all"
                  placeholder="BIGI..."
                  value={transferData.toAccountNumber}
                  onChange={(e) => setTransferData({...transferData, toAccountNumber: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                <input 
                  required
                  type="number" 
                  min="1"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal transition-all"
                  placeholder="0.00"
                  value={transferData.amount}
                  onChange={(e) => setTransferData({...transferData, amount: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal transition-all"
                  placeholder="What's this for?"
                  value={transferData.description}
                  onChange={(e) => setTransferData({...transferData, description: e.target.value})}
                />
              </div>
              <button 
                disabled={transferLoading}
                type="submit" 
                className="w-full py-3 bg-royal hover:bg-navy text-white rounded-xl font-semibold transition-all disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {transferLoading ? 'Processing...' : 'Send Money'} <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Header Greeting */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp}
        className="flex items-center justify-between"
      >
        <div>
          <p className="text-gray-500 text-sm">{greeting()},</p>
          <h2 className="font-display text-2xl font-bold text-navy">
            {user?.name?.split(' ')[0] || 'User'} 👋
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchDashboardData} className="btn btn-outline btn-sm">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </motion.div>

      {/* Main Balance Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-3xl overflow-hidden shadow-xl"
        style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1a3a6b 50%, #0066FF 100%)' }}
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/8 rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="relative p-6 lg:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-white/60 text-sm mb-1">Total Portfolio Value</p>
              <div className="flex items-center gap-3">
                <h3 className="font-display font-black text-4xl text-white">
                  {showBalance ? `₹${totalBalance.toLocaleString('en-IN')}` : '₹ ••••••••'}
                </h3>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <ArrowUpRight size={14} className="text-emerald-bank" />
                <span className="text-emerald-bank text-sm font-semibold">+₹24,500 this month</span>
                <span className="text-white/40 text-xs">(+5.4%)</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gold/20 rounded-2xl flex items-center justify-center">
              <Wallet size={22} className="text-gold" />
            </div>
          </div>

          {/* Sub-account pills */}
          <div className="flex flex-wrap gap-3 mb-6">
            {accounts.map((acc) => (
              <button
                key={acc._id}
                onClick={() => setSelectedAccount(acc)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedAccount?._id === acc._id
                    ? 'bg-white text-navy shadow-lg'
                    : 'bg-white/10 text-white/80 hover:bg-white/15'
                }`}
              >
                {acc.accountType.toUpperCase()} · {acc.accountNumber}
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-3">
            <button 
              onClick={() => setIsTransferModalOpen(true)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/8 hover:bg-white/15 transition-all group"
            >
              <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center group-hover:bg-white/25 transition-colors text-white">
                <Send size={18} />
              </div>
              <span className="text-white/80 text-xs font-medium">Transfer</span>
            </button>
            {QUICK_ACTIONS.slice(1).map(({ icon: Icon, label, color, path }) => (
              <Link key={label} to={path}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/8 hover:bg-white/15 transition-all group"
              >
                <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center group-hover:bg-white/25 transition-colors">
                  <Icon size={18} className="text-white" />
                </div>
                <span className="text-white/80 text-xs font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { icon: TrendingUp, label: 'Investments', value: '₹6,12,000', change: '+18.4%', color: 'text-emerald-bank', bg: 'bg-emerald-50' },
          { icon: CreditCard, label: 'Credit Limit', value: '₹5,00,000', change: '₹3,20,000 available', color: 'text-royal', bg: 'bg-blue-50' },
          { icon: Banknote, label: 'Active Loans', value: '₹8,50,000', change: 'EMI: ₹18,240/mo', color: 'text-orange-500', bg: 'bg-orange-50' },
          { icon: Shield, label: 'Insurance', value: '3 Active', change: 'All premiums paid', color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map(({ icon: Icon, label, value, change, color, bg }) => (
          <motion.div key={label} variants={fadeUp}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card hover:shadow-card-lg transition-all"
          >
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <p className="text-gray-500 text-xs mb-1">{label}</p>
            <p className="font-bold text-navy text-lg">{value}</p>
            <p className={`text-xs font-medium mt-0.5 ${color}`}>{change}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts + Transactions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Balance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-card"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-navy font-display">Balance Trend</h3>
              <p className="text-gray-400 text-xs mt-0.5">Last 6 months savings account</p>
            </div>
            <span className="badge badge-info">+5.4% growth</span>
          </div>
          <Line data={balanceData} options={chartOptions} height={200} />
        </motion.div>

        {/* Spending Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card"
        >
          <h3 className="font-bold text-navy font-display mb-1">Spending Breakdown</h3>
          <p className="text-gray-400 text-xs mb-4">This Month</p>
          <Doughnut data={spendingData} options={doughnutOptions} />
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-xs">Total Spent This Month</p>
            <p className="font-bold text-navy text-xl">₹42,350</p>
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-50">
          <h3 className="font-bold text-navy font-display">Recent Transactions</h3>
          <Link to="/dashboard/transactions" className="text-royal text-sm font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {transactions.length > 0 ? transactions.map((txn) => (
            <div key={txn._id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${txn.type === 'credit' ? 'bg-emerald-50' : 'bg-red-50'}`}>
                  {txn.type === 'credit'
                    ? <ArrowDownLeft size={18} className="text-emerald-bank" />
                    : <ArrowUpRight size={18} className="text-red-500" />
                  }
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">{txn.description}</p>
                  <p className="text-gray-400 text-xs">{new Date(txn.createdAt).toLocaleDateString()} • {txn.category}</p>
                </div>
              </div>
              <div className={`font-bold text-sm ${txn.type === 'credit' ? 'text-emerald-bank' : 'text-red-500'}`}>
                {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
              </div>
            </div>
          )) : (
            <div className="px-6 py-8 text-center text-gray-500">No recent transactions.</div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
