import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { loginStart, loginSuccess, loginFailure } from '../../redux/slices/authSlice';
import { authAPI } from '../../services/api';
import { Eye, EyeOff, LogIn, Shield, Lock } from 'lucide-react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    dispatch(loginStart());
    setIsLoading(true);
    try {
      const res = await authAPI.login(data);
      dispatch(loginSuccess(res.data));
      toast.success(`Welcome back, ${res.data.user.name}! 👋`);
      navigate(res.data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please try again.';
      dispatch(loginFailure(msg));
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-navy relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-royal/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gold/15 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-12">
          <div className="w-16 h-16 bg-gradient-to-br from-royal to-navy-light rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-royal">
            <span className="text-gold font-black text-3xl">B</span>
          </div>
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Welcome Back to<br />
            <span className="gradient-text-light">BigiBank</span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed max-w-sm mx-auto">
            Your trusted digital banking partner. Secure, smart, and always available.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 max-w-xs mx-auto">
            {[
              { icon: Shield, text: 'Bank-grade Security' },
              { icon: Lock, text: '256-bit Encryption' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="glass rounded-xl p-3 text-center">
                <Icon size={18} className="text-gold mx-auto mb-1" />
                <div className="text-white/70 text-xs">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel – Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-bg-primary">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-royal to-navy rounded-xl flex items-center justify-center">
                <span className="text-gold font-black text-xl">B</span>
              </div>
              <span className="font-black text-2xl font-display text-navy">
                Bigi<span className="text-royal">Bank</span>
              </span>
            </Link>
          </div>

          <div className="glass-card rounded-3xl p-8">
            <div className="mb-8">
              <h1 className="font-display text-2xl font-bold text-navy mb-1">Sign In</h1>
              <p className="text-gray-500 text-sm">Access your BigiBank account securely</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
                  })}
                  placeholder="your@email.com"
                  className={`input-field ${errors.email ? 'error' : ''}`}
                />
                {errors.email && <p className="input-error-msg">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="input-group">
                <label className="input-label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { required: 'Password is required' })}
                    placeholder="Enter your password"
                    className={`input-field pr-12 ${errors.password ? 'error' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="input-error-msg">{errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded accent-royal" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-royal hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full justify-center h-12 text-base"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn size={18} />
                    Sign In to BigiBank
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-royal font-semibold hover:underline">
                  Open Free Account
                </Link>
              </p>
            </div>

            {/* Demo credentials */}
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-xs text-amber-700 font-semibold mb-1">🎯 Demo Credentials:</p>
              <p className="text-xs text-amber-600">User: demo@bigibank.com / Password: demo123</p>
              <p className="text-xs text-amber-600">Admin: admin@bigibank.com / Password: admin123</p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Protected by BigiBank Security · RBI Regulated
          </p>
        </motion.div>
      </div>
    </div>
  );
}
