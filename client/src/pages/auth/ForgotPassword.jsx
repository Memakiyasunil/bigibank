import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { authAPI } from '../../services/api';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email address');
    setLoading(true);
    try {
      await authAPI.forgotPassword(email);
      setSent(true);
      toast.success('Reset link sent! Check your email.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-navy flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="glass-card rounded-3xl p-8 text-center">
          <div className="w-16 h-16 bg-gradient-royal rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-royal">
            <KeyRound size={28} className="text-white" />
          </div>
          {sent ? (
            <>
              <h1 className="font-display text-2xl font-bold text-navy mb-3">Check Your Email</h1>
              <p className="text-gray-500 text-sm mb-6">
                We've sent a password reset link to <strong>{email}</strong>. 
                The link will expire in 15 minutes.
              </p>
              <Link to="/login" className="btn btn-primary w-full justify-center">
                Back to Login
              </Link>
            </>
          ) : (
            <>
              <h1 className="font-display text-2xl font-bold text-navy mb-2">Forgot Password?</h1>
              <p className="text-gray-500 text-sm mb-6">
                Enter your registered email and we'll send you a secure reset link.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="input-group">
                  <label className="input-label">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="input-field pl-10"
                    />
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center h-12">
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Send Reset Link'}
                </button>
              </form>
              <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-navy mt-4 transition-colors">
                <ArrowLeft size={14} />Back to Login
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
