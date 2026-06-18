import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, Shield, TrendingUp, CreditCard, Banknote,
  Smartphone, Globe, Star, ChevronRight, Users, DollarSign,
  Clock, Lock, Zap, Award, CheckCircle, Building2, Target,
  BarChart3, Headphones, Play
} from 'lucide-react';

// ── Counter Animation ──────────────────────────────────────────────
function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ── Section Fade In ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── Data ──────────────────────────────────────────────────────────
const STATS = [
  { number: 1, suffix: 'M+', label: 'Happy Customers', icon: Users },
  { number: 10, prefix: '$', suffix: 'B+', label: 'Transactions Processed', icon: DollarSign },
  { number: 24, suffix: '/7', label: 'Customer Support', icon: Headphones },
  { number: 99, suffix: '.9%', label: 'System Uptime', icon: Lock },
];

const SERVICES = [
  {
    icon: Building2,
    emoji: '🏦',
    title: 'Smart Accounts',
    desc: 'Savings, Current, FD & RD accounts with industry-leading interest rates and zero maintenance fees.',
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-royal',
    link: '/accounts',
  },
  {
    icon: CreditCard,
    emoji: '💳',
    title: 'Premium Cards',
    desc: 'Credit, Debit & Virtual cards with exclusive rewards, cashback, and global acceptance.',
    bg: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    link: '/cards',
  },
  {
    icon: Banknote,
    emoji: '💰',
    title: 'Easy Loans',
    desc: 'Personal, Home, Vehicle & Business loans with competitive rates and instant approval.',
    bg: 'bg-green-50',
    iconBg: 'bg-green-100',
    iconColor: 'text-emerald-bank',
    link: '/loans',
  },
  {
    icon: TrendingUp,
    emoji: '📈',
    title: 'Smart Investments',
    desc: 'Grow your wealth with Mutual Funds, Stocks, SIP, Gold & Fixed Deposits.',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-gold-dark',
    link: '/investments',
  },
  {
    icon: Shield,
    emoji: '🛡️',
    title: 'Insurance Plans',
    desc: 'Comprehensive Health, Life, Vehicle & Travel insurance for complete peace of mind.',
    bg: 'bg-red-50',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
    link: '/insurance',
  },
  {
    icon: Smartphone,
    emoji: '📱',
    title: 'Digital Banking',
    desc: 'Mobile banking, UPI, QR payments & internet banking — bank from anywhere, anytime.',
    bg: 'bg-teal-50',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    link: '/digital-banking',
  },
];

const WHY_BIGIBANK = [
  { icon: Zap, title: 'Instant Transactions', desc: 'Real-time transfers and payments in seconds' },
  { icon: Shield, title: 'Bank-grade Security', desc: '256-bit encryption and multi-factor authentication' },
  { icon: Globe, title: 'Global Access', desc: 'Bank from 150+ countries, 24/7 anytime' },
  { icon: Award, title: 'Award Winning', desc: 'Best Digital Bank of the Year 2024' },
  { icon: Target, title: 'Smart Goals', desc: 'AI-powered savings goals and financial planning' },
  { icon: Headphones, title: '24/7 Support', desc: 'Round-the-clock customer support via chat, call & email' },
];

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer, Bangalore',
    avatar: 'PS',
    rating: 5,
    text: 'BigiBank has completely transformed my banking experience. The app is intuitive, the interest rates are unbeatable, and customer support is exceptional!',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Business Owner, Mumbai',
    avatar: 'RK',
    rating: 5,
    text: 'Got my business loan approved in 48 hours! The process was completely online, paperless, and hassle-free. BigiBank truly understands modern banking needs.',
  },
  {
    name: 'Ananya Patel',
    role: 'Doctor, Ahmedabad',
    avatar: 'AP',
    rating: 5,
    text: 'The investment portfolio dashboard is incredible. I can track my mutual funds, SIPs and gold investments all in one place. My returns have grown 18% this year!',
  },
];

const LOAN_TYPES = [
  { icon: '🏠', name: 'Home Loan', rate: '8.5%', type: 'home' },
  { icon: '🚗', name: 'Vehicle Loan', rate: '9.5%', type: 'vehicle' },
  { icon: '👤', name: 'Personal Loan', rate: '12.5%', type: 'personal' },
  { icon: '🎓', name: 'Education Loan', rate: '10.5%', type: 'education' },
  { icon: '🏢', name: 'Business Loan', rate: '14.0%', type: 'business' },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* ── HERO SECTION ──────────────────────────────────────────── */}
      <section className="relative min-h-dvh flex items-center bg-gradient-navy overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-royal/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-emerald-bank/10 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="container mx-auto px-6 relative z-10 pt-32 lg:pt-48 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-gold text-sm font-semibold mb-6"
              >
                <span className="w-2 h-2 bg-emerald-bank rounded-full animate-pulse" />
                Trusted by 1M+ customers across India
              </motion.div>

              <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-white mb-6">
                Your Trusted{' '}
                <span className="gradient-text-light block">Digital Banking</span>
                Partner
              </h1>

              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                Experience next-generation banking with BigiBank. Secure accounts, instant transfers,
                smart investments, and comprehensive insurance — all in one premium platform.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/register" className="btn btn-gold btn-lg group">
                  Open Account
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/loans/apply" className="btn btn-outline-white btn-lg">
                  Apply for Loan
                </Link>
                <Link to="/investments" className="btn btn-outline-white btn-lg">
                  Start Investing
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 text-white/60 text-sm">
                {[
                  { icon: Lock, text: 'RBI Regulated' },
                  { icon: Shield, text: 'DICGC Insured' },
                  { icon: CheckCircle, text: 'Zero Hidden Fees' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <Icon size={13} className="text-emerald-bank" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right – Floating Bank Card UI */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              {/* Main Card */}
              <div className="relative animate-float">
                <div className="bank-card bank-card-visa w-80">
                  {/* Card shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
                  {/* Chip */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-10 h-7 bg-gold/80 rounded-md flex items-center justify-center">
                      <div className="w-6 h-5 border border-gold-dark/40 rounded-sm opacity-70" />
                    </div>
                    <div className="text-white/60 text-xs font-mono">VISA</div>
                  </div>
                  <div className="text-white/90 font-mono text-sm tracking-widest mb-4">
                    **** **** **** 4829
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-white/50 text-xs mb-1">Card Holder</div>
                      <div className="text-white font-semibold text-sm">ARJUN MEHTA</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/50 text-xs mb-1">Expires</div>
                      <div className="text-white font-semibold text-sm">12/27</div>
                    </div>
                  </div>
                  {/* BigiBank watermark */}
                  <div className="absolute top-4 right-4 text-white/20 font-black text-xs font-display">BigiBank</div>
                </div>

                {/* Floating Stats Cards */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute -top-8 -right-12 glass rounded-2xl p-4 min-w-[150px]"
                >
                  <div className="text-white/60 text-xs mb-1">Portfolio Value</div>
                  <div className="text-white font-bold text-xl">₹4,82,340</div>
                  <div className="text-emerald-bank text-xs font-semibold">+12.4% ↑ this month</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-8 -left-12 glass rounded-2xl p-4 min-w-[160px]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-emerald-bank/20 rounded-full flex items-center justify-center">
                      <CheckCircle size={14} className="text-emerald-bank" />
                    </div>
                    <div className="text-white/60 text-xs">Transfer Successful</div>
                  </div>
                  <div className="text-white font-bold">₹25,000</div>
                  <div className="text-white/50 text-xs">to Savings Account</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 40C1200 80 960 0 720 40C480 80 240 0 0 40L0 80Z" fill="#F8FAFC" />
          </svg>
        </div>
      </section>

      {/* ── STATS SECTION ──────────────────────────────────────────── */}
      <section className="py-16 bg-bg-primary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ number, suffix, prefix, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-card-lg transition-all group"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-royal-dark to-royal flex items-center justify-center shadow-royal">
                  <Icon size={22} className="text-white" />
                </div>
                <div className="font-black text-4xl text-navy font-display mb-1">
                  <AnimatedCounter end={number} suffix={suffix} prefix={prefix} />
                </div>
                <div className="text-gray-500 text-sm font-medium">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ──────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.span variants={fadeUp} className="section-badge">
              <Building2 size={12} />
              Our Services
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-title mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Bank Smarter</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle mx-auto text-center">
              From everyday banking to complex investments — BigiBank offers a complete suite of 
              financial products designed for modern India.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SERVICES.map((service, i) => (
              <motion.div key={service.title} variants={fadeUp}>
                <Link to={service.link} className="service-card block group">
                  <div className={`service-icon ${service.iconBg} mb-5`}>
                    <span className="text-3xl">{service.emoji}</span>
                  </div>
                  <h3 className="font-bold text-lg text-navy mb-2 font-display group-hover:text-royal transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.desc}</p>
                  <div className="flex items-center gap-1 text-royal text-sm font-semibold">
                    Learn More <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── LOAN RATES BANNER ─────────────────────────────────────── */}
      <section className="py-16 bg-gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #0066FF 0%, transparent 60%)' }} />
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-white mb-3">
              Lowest Loan Rates in India
            </h2>
            <p className="text-white/60">Quick approval · Paperless process · Direct disbursement</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {LOAN_TYPES.map((loan, i) => (
              <motion.div
                key={loan.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/loans?type=${loan.type}`}
                  className="glass rounded-2xl p-5 text-center hover:bg-white/15 transition-all group block"
                >
                  <div className="text-3xl mb-2">{loan.icon}</div>
                  <div className="text-white font-semibold text-sm mb-1">{loan.name}</div>
                  <div className="text-gold font-black text-xl">from {loan.rate}</div>
                  <div className="text-white/50 text-xs mt-1">per annum</div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/loans/apply" className="btn btn-gold btn-lg">
              Apply for Loan Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY BIGIBANK ──────────────────────────────────────────── */}
      <section className="section bg-bg-primary">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-badge">
                <CheckCircle size={12} />
                Why Choose Us
              </span>
              <h2 className="section-title mb-4">
                Banking Built for <span className="gradient-text">The Future</span>
              </h2>
              <p className="section-subtitle mb-8">
                We combine cutting-edge technology with decades of banking expertise to deliver 
                an unparalleled financial experience.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {WHY_BIGIBANK.map(({ icon: Icon, title, desc }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-card transition-all"
                  >
                    <div className="w-11 h-11 bg-gradient-royal rounded-xl flex items-center justify-center flex-shrink-0 shadow-royal">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-sm">{title}</h3>
                      <p className="text-gray-500 text-sm mt-0.5">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Dashboard Preview Card */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Total Balance</div>
                    <div className="font-black text-3xl text-navy font-display">₹12,48,320</div>
                    <div className="text-emerald-bank text-xs font-semibold mt-1">+₹24,500 this month ↑</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-royal rounded-2xl flex items-center justify-center shadow-royal">
                    <BarChart3 size={20} className="text-white" />
                  </div>
                </div>

                {/* Mini Chart bars */}
                <div className="flex items-end gap-2 h-24 mb-6">
                  {[65, 80, 55, 90, 70, 85, 95, 75, 88, 100, 80, 92].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-sm"
                      style={{
                        height: `${h}%`,
                        background: i === 11 ? 'linear-gradient(to top, #0052CC, #0066FF)' : 'linear-gradient(to top, #e5e7eb, #f3f4f6)',
                      }}
                    />
                  ))}
                </div>

                {/* Account Pills */}
                <div className="space-y-3">
                  {[
                    { label: 'Savings Account', amount: '₹4,82,320', color: 'bg-blue-50 text-royal' },
                    { label: 'Investment Portfolio', amount: '₹6,12,000', color: 'bg-emerald-50 text-emerald-bank' },
                    { label: 'Fixed Deposits', amount: '₹1,54,000', color: 'bg-amber-50 text-gold-dark' },
                  ].map(({ label, amount, color }) => (
                    <div key={label} className={`flex items-center justify-between px-4 py-3 rounded-xl ${color.split(' ')[0]}`}>
                      <span className={`text-sm font-semibold ${color.split(' ')[1]}`}>{label}</span>
                      <span className="font-bold text-navy text-sm">{amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-gold rounded-2xl px-4 py-2 shadow-gold">
                <div className="text-navy font-bold text-xs">🏆 Best Digital Bank 2024</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.span variants={fadeUp} className="section-badge">
              <Star size={12} />
              Customer Stories
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-title mb-4">
              Loved by <span className="gradient-text">1 Million+</span> Indians
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp}
                className="p-6 bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-lg transition-all"
              >
                <div className="flex items-center gap-1 text-gold mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-royal flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-navy text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-royal/25 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-gold/15 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Ready to Experience{' '}
              <span className="gradient-text-light">Premium Banking?</span>
            </h2>
            <p className="text-white/65 text-lg mb-10 max-w-lg mx-auto">
              Join 1 million+ Indians who trust BigiBank for their financial future. 
              Open your account in just 5 minutes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/register" className="btn btn-gold btn-lg">
                Open Free Account <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn btn-outline-white btn-lg">
                <Headphones size={18} />
                Talk to an Expert
              </Link>
            </div>
            <p className="text-white/40 text-xs mt-6">
              No hidden fees · DICGC insured · RBI regulated · 24/7 support
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
