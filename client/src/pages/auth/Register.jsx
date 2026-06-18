import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { loginSuccess } from '../../redux/slices/authSlice';
import { authAPI } from '../../services/api';
import { Eye, EyeOff, UserPlus, CheckCircle, Shield } from 'lucide-react';

const BENEFITS = [
  'Zero account opening fees',
  'Instant virtual debit card',
  '4% interest on savings',
  'Free UPI & NEFT transfers',
];

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await authAPI.register({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });
      dispatch(loginSuccess(res.data));
      toast.success('Account created successfully! Welcome to BigiBank 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col flex-1 bg-gradient-navy relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-royal/25 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 px-12 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-dark rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-gold">
              <Shield size={28} className="text-navy" />
            </div>
            <h2 className="font-display text-3xl font-bold text-white mb-3">
              Join <span className="gradient-text-light">BigiBank</span> Today
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto">
              Open your account in 5 minutes. No paperwork, no branch visits.
            </p>
          </div>
          <div className="space-y-3 max-w-xs mx-auto text-left">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-center gap-3 glass rounded-xl px-4 py-2.5">
                <CheckCircle size={16} className="text-emerald-bank flex-shrink-0" />
                <span className="text-white/80 text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right – Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-bg-primary overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
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
            <div className="mb-6">
              <h1 className="font-display text-2xl font-bold text-navy mb-1">Create Account</h1>
              <p className="text-gray-500 text-sm">Start your banking journey with BigiBank</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input
                  {...register('name', { required: 'Full name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } })}
                  placeholder="Arjun Mehta"
                  className={`input-field ${errors.name ? 'error' : ''}`}
                />
                {errors.name && <p className="input-error-msg">{errors.name.message}</p>}
              </div>

              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
                  })}
                  placeholder="arjun@email.com"
                  className={`input-field ${errors.email ? 'error' : ''}`}
                />
                {errors.email && <p className="input-error-msg">{errors.email.message}</p>}
              </div>

              <div className="input-group">
                <label className="input-label">Mobile Number</label>
                <input
                  type="tel"
                  {...register('phone', {
                    required: 'Mobile number is required',
                    pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit mobile number' },
                  })}
                  placeholder="9876543210"
                  className={`input-field ${errors.phone ? 'error' : ''}`}
                />
                {errors.phone && <p className="input-error-msg">{errors.phone.message}</p>}
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' },
                    })}
                    placeholder="Create strong password"
                    className={`input-field pr-12 ${errors.password ? 'error' : ''}`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="input-error-msg">{errors.password.message}</p>}
              </div>

              <div className="input-group">
                <label className="input-label">Confirm Password</label>
                <input
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Please confirm password',
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                  placeholder="Re-enter password"
                  className={`input-field ${errors.confirmPassword ? 'error' : ''}`}
                />
                {errors.confirmPassword && <p className="input-error-msg">{errors.confirmPassword.message}</p>}
              </div>

              <div className="flex items-start gap-2 text-sm">
                <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-royal" />
                <span className="text-gray-600">
                  I agree to the{' '}
                  <Link to="#" className="text-royal hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="#" className="text-royal hover:underline">Privacy Policy</Link>
                </span>
              </div>

              <button type="submit" disabled={isLoading}
                className="btn btn-primary w-full justify-center h-12 text-base">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><UserPlus size={18} />Create My Account</>
                )}
              </button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-gray-500 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-royal font-semibold hover:underline">Sign In</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
