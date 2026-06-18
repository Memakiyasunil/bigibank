import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { loanAPI } from '../services/api';
import { ArrowLeft, ArrowRight, Calculator } from 'lucide-react';

const LOAN_TYPES = [
  { value: 'personal', label: 'Personal Loan', rate: 12.5, icon: '👤' },
  { value: 'home', label: 'Home Loan', rate: 8.5, icon: '🏠' },
  { value: 'vehicle', label: 'Vehicle Loan', rate: 9.5, icon: '🚗' },
  { value: 'education', label: 'Education Loan', rate: 10.5, icon: '🎓' },
  { value: 'business', label: 'Business Loan', rate: 14.0, icon: '🏢' },
];

export default function LoanApply() {
  const [isLoading, setIsLoading] = useState(false);
  const [emi, setEmi] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const loanType = watch('loanType');
  const amount = watch('amount');
  const tenure = watch('tenure');
  const selectedLoan = LOAN_TYPES.find(l => l.value === loanType);

  const calcEMI = () => {
    if (!amount || !tenure || !selectedLoan) return;
    const r = selectedLoan.rate / 12 / 100;
    const n = parseInt(tenure);
    const p = parseFloat(amount);
    const emiVal = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(Math.round(emiVal));
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await loanAPI.applyLoan(data);
      toast.success('Loan application submitted! We\'ll review within 48 hours.');
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error('Please login to apply for a loan');
        navigate('/login');
      } else {
        toast.error(err.response?.data?.message || 'Application failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-20 pb-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link to="/loans" className="inline-flex items-center gap-2 text-royal-DEFAULT hover:underline mb-8 font-medium">
          <ArrowLeft size={16} />Back to Loans
        </Link>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl font-bold text-navy-DEFAULT mb-2">Loan Application</h1>
            <p className="text-gray-500">Fill in your details to apply. 48-hour approval guaranteed.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="glass-card rounded-3xl p-8 space-y-5">
              <h2 className="font-bold text-navy-DEFAULT font-display">Loan Details</h2>

              {/* Loan Type Selector */}
              <div className="input-group">
                <label className="input-label">Loan Type *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {LOAN_TYPES.map((lt) => (
                    <label key={lt.value} className="cursor-pointer">
                      <input type="radio" {...register('loanType', { required: 'Select loan type' })} value={lt.value} className="sr-only peer" />
                      <div className="p-3 border-2 border-gray-200 rounded-xl peer-checked:border-royal-DEFAULT peer-checked:bg-blue-50 transition-all text-center">
                        <div className="text-2xl mb-1">{lt.icon}</div>
                        <div className="text-xs font-semibold text-navy-DEFAULT">{lt.label}</div>
                        <div className="text-xs text-gray-400">{lt.rate}% p.a.</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.loanType && <p className="input-error-msg">{errors.loanType.message}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="input-group">
                  <label className="input-label">Loan Amount (₹) *</label>
                  <input type="number" {...register('amount', { required: 'Amount required', min: { value: 10000, message: 'Min ₹10,000' } })}
                    placeholder="500000" className={`input-field ${errors.amount ? 'error' : ''}`} onChange={calcEMI} />
                  {errors.amount && <p className="input-error-msg">{errors.amount.message}</p>}
                </div>
                <div className="input-group">
                  <label className="input-label">Tenure (Months) *</label>
                  <select {...register('tenure', { required: 'Tenure required' })} className="input-field" onChange={calcEMI}>
                    <option value="">Select tenure</option>
                    {[12, 24, 36, 48, 60, 84, 120, 180, 240].map(m => (
                      <option key={m} value={m}>{m} months ({Math.floor(m / 12)} {m < 24 ? 'year' : 'years'})</option>
                    ))}
                  </select>
                </div>
              </div>

              {emi && (
                <div className="p-4 bg-gradient-royal rounded-2xl text-center text-white">
                  <p className="text-white/70 text-sm">Estimated Monthly EMI</p>
                  <p className="font-black text-3xl font-display">₹{emi.toLocaleString()}</p>
                  <p className="text-white/60 text-xs mt-1">at {selectedLoan?.rate}% p.a.</p>
                </div>
              )}

              <div className="input-group">
                <label className="input-label">Purpose</label>
                <textarea {...register('purpose')} placeholder="Briefly describe your loan purpose..."
                  rows={3} className="input-field resize-none" />
              </div>
            </div>

            <div className="glass-card rounded-3xl p-8 space-y-4">
              <h2 className="font-bold text-navy-DEFAULT font-display">Employment Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="input-group">
                  <label className="input-label">Employment Type *</label>
                  <select {...register('employmentType', { required: true })} className="input-field">
                    <option value="">Select</option>
                    <option value="salaried">Salaried</option>
                    <option value="self_employed">Self Employed</option>
                    <option value="business">Business Owner</option>
                    <option value="student">Student</option>
                    <option value="retired">Retired</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Monthly Income (₹) *</label>
                  <input type="number" {...register('monthlyIncome', { required: true })}
                    placeholder="85000" className="input-field" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn btn-primary btn-lg w-full justify-center">
              {isLoading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><ArrowRight size={18} />Submit Application</>
              }
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
