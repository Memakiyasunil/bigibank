import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../redux/slices/authSlice';
import {
  Home, CreditCard, TrendingUp, Shield, Calculator, Banknote,
  ChevronDown, Menu, X, LogIn, UserPlus, User, LogOut,
  Building2, Smartphone, BarChart3, HeadphonesIcon, Globe, BookOpen
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', path: '/', icon: Home },
  {
    label: 'Banking',
    icon: Building2,
    dropdown: [
      { label: 'Accounts', path: '/accounts', desc: 'Savings, Current, FD & RD' },
      { label: 'Cards', path: '/cards', desc: 'Credit, Debit & Virtual Cards' },
      { label: 'Digital Banking', path: '/digital-banking', desc: 'Mobile, UPI & Internet Banking' },
    ],
  },
  {
    label: 'Loans',
    icon: Banknote,
    dropdown: [
      { label: 'Personal Loan', path: '/loans?type=personal', desc: 'Quick personal finance' },
      { label: 'Home Loan', path: '/loans?type=home', desc: 'Your dream home awaits' },
      { label: 'Vehicle Loan', path: '/loans?type=vehicle', desc: 'Drive your dream car' },
      { label: 'Education Loan', path: '/loans?type=education', desc: 'Invest in your future' },
      { label: 'Business Loan', path: '/loans?type=business', desc: 'Grow your business' },
    ],
  },
  {
    label: 'Invest',
    icon: TrendingUp,
    dropdown: [
      { label: 'Mutual Funds', path: '/investments?type=mutual_fund', desc: 'Diversified portfolio' },
      { label: 'Stocks & Trading', path: '/investments?type=stocks', desc: 'Real-time market' },
      { label: 'SIP Plans', path: '/investments?type=sip', desc: 'Systematic investing' },
      { label: 'Gold Investment', path: '/investments?type=gold', desc: 'Digital gold' },
      { label: 'Fixed Deposits', path: '/investments?type=fd', desc: 'Guaranteed returns' },
    ],
  },
  {
    label: 'Insurance',
    icon: Shield,
    dropdown: [
      { label: 'Health Insurance', path: '/insurance?type=health', desc: 'Complete health cover' },
      { label: 'Life Insurance', path: '/insurance?type=life', desc: 'Protect your family' },
      { label: 'Vehicle Insurance', path: '/insurance?type=vehicle', desc: 'Drive worry-free' },
      { label: 'Travel Insurance', path: '/insurance?type=travel', desc: 'Explore confidently' },
    ],
  },
  { label: 'Calculators', path: '/calculators', icon: Calculator },
  { label: 'About', path: '/about', icon: Globe },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);
  const dropdownTimer = useRef(null);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleMouseEnter = (label) => {
    clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navBg = isHome && !isScrolled
    ? 'bg-transparent'
    : 'bg-white/95 backdrop-blur-xl shadow-md border-b border-white/20';

  const textColor = isHome && !isScrolled ? 'text-white' : 'text-gray-800';
  const logoColor = isHome && !isScrolled ? 'text-gold-DEFAULT' : 'text-navy-DEFAULT';

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-royal to-navy flex items-center justify-center shadow-royal">
              <span className="text-gold-DEFAULT font-black text-lg">B</span>
            </div>
            <div>
              <span className={`font-black text-xl tracking-tight font-display ${logoColor}`}>
                Bigi<span className="text-royal-DEFAULT">Bank</span>
              </span>
              <div className={`text-xs ${isHome && !isScrolled ? 'text-white/60' : 'text-gray-400'} leading-none`}>
                Digital Banking
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && handleMouseEnter(link.label)}
                onMouseLeave={() => link.dropdown && handleMouseLeave()}
              >
                {link.dropdown ? (
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10 ${textColor}`}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10 ${textColor} ${location.pathname === link.path ? 'bg-white/15' : ''}`}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                      onMouseEnter={() => handleMouseEnter(link.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-2">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            to={item.path}
                            className="flex flex-col px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors group"
                          >
                            <span className="font-semibold text-navy-DEFAULT text-sm group-hover:text-royal-DEFAULT transition-colors">
                              {item.label}
                            </span>
                            {item.desc && (
                              <span className="text-xs text-gray-400 mt-0.5">{item.desc}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard" className="btn btn-primary btn-sm">
                  <BarChart3 size={15} />
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors hover:bg-white/10 ${textColor}`}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-royal to-navy flex items-center justify-center text-white font-bold text-sm">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="font-medium text-sm">{user?.name?.split(' ')[0]}</span>
                    <ChevronDown size={14} />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <div className="p-3 border-b border-gray-50">
                      <p className="font-semibold text-navy-DEFAULT text-sm">{user?.name}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                    <div className="p-2">
                      {user?.role === 'admin' && (
                        <Link to="/admin" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 text-sm text-navy-DEFAULT transition-colors">
                          <Shield size={15} />Admin Panel
                        </Link>
                      )}
                      <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 text-sm text-navy-DEFAULT transition-colors">
                        <User size={15} />My Profile
                      </Link>
                      <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-sm text-red-500 w-full transition-colors">
                        <LogOut size={15} />Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-white/10 ${textColor}`}>
                  <LogIn size={15} />Login
                </Link>
                <Link to="/register" className="btn btn-gold btn-sm">
                  <UserPlus size={15} />
                  Open Account
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors hover:bg-white/10 ${textColor}`}
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-navy-DEFAULT font-semibold text-sm hover:bg-gray-50"
                      >
                        {link.label}
                        <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === link.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 mt-1 space-y-1 overflow-hidden"
                          >
                            {link.dropdown.map((item) => (
                              <Link key={item.label} to={item.path} className="block px-4 py-2 text-sm text-gray-600 hover:text-royal-DEFAULT hover:bg-blue-50 rounded-lg transition-colors">
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link to={link.path} className="block px-4 py-3 rounded-xl text-navy-DEFAULT font-semibold text-sm hover:bg-gray-50">
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="btn btn-primary w-full justify-center">Dashboard</Link>
                    <button onClick={handleLogout} className="btn btn-outline w-full justify-center">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-outline w-full justify-center">Login</Link>
                    <Link to="/register" className="btn btn-gold w-full justify-center">Open Account</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
