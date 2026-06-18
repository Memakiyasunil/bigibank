import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../redux/slices/authSlice';
import {
  LayoutDashboard, CreditCard, TrendingUp, Shield, Banknote,
  Bell, Settings, LogOut, Menu, X, User, ChevronRight,
  Home, BarChart3, HelpCircle, Building2, Smartphone
} from 'lucide-react';

const USER_NAV = [
  { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { label: 'My Accounts', path: '/dashboard/accounts', icon: Building2 },
  { label: 'Transactions', path: '/dashboard/transactions', icon: BarChart3 },
  { label: 'Cards', path: '/dashboard/cards', icon: CreditCard },
  { label: 'Loans', path: '/dashboard/loans', icon: Banknote },
  { label: 'Investments', path: '/dashboard/investments', icon: TrendingUp },
  { label: 'Insurance', path: '/dashboard/insurance', icon: Shield },
  { label: 'Payments', path: '/dashboard/payments', icon: Smartphone },
  { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  { label: 'Help & Support', path: '/dashboard/support', icon: HelpCircle },
];

const ADMIN_NAV = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Users', path: '/admin/users', icon: User },
  { label: 'Loans', path: '/admin/loans', icon: Banknote },
  { label: 'Transactions', path: '/admin/transactions', icon: BarChart3 },
  { label: 'Analytics', path: '/admin/analytics', icon: TrendingUp },
  { label: 'Support Tickets', path: '/admin/tickets', icon: HelpCircle },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function DashboardLayout({ isAdmin = false }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = isAdmin ? ADMIN_NAV : USER_NAV;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-dvh bg-gray-50 flex pt-safe pb-safe pl-safe pr-safe">
      {/* Sidebar Overlay (mobile) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`sidebar z-50 ${sidebarOpen ? 'open' : ''}`}
        style={{ transform: sidebarOpen ? 'translateX(0)' : undefined }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-royal to-royal-dark flex items-center justify-center">
              <span className="text-gold font-black text-lg">B</span>
            </div>
            <div>
              <div className="font-black text-lg text-white font-display">BigiBank</div>
              <div className="text-xs text-white/40">{isAdmin ? 'Admin Panel' : 'My Banking'}</div>
            </div>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 mx-3 mt-4 rounded-xl bg-white/6 border border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-royal to-gold flex items-center justify-center text-white font-bold">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white truncate">{user?.name}</div>
              <div className="text-xs text-white/45 truncate">{user?.email}</div>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="p-4 space-y-1 mt-4 flex-1">
          {navItems.map(({ label, path, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link key={label} to={path} className={`nav-item ${isActive ? 'active' : ''}`}>
                <Icon size={18} />
                <span>{label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto opacity-60" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/8 space-y-1">
          <Link to="/" className="nav-item">
            <Home size={18} />
            <span>Back to Home</span>
          </Link>
          <button onClick={handleLogout} className="nav-item w-full text-red-400 hover:bg-red-500/15 hover:text-red-300">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col dashboard-content">
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors text-navy"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-navy font-display">
                {navItems.find(n => n.path === location.pathname)?.label || 'Dashboard'}
              </h1>
              <p className="text-xs text-gray-400">
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors text-navy">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-royal to-navy flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
