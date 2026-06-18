import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import {
  LayoutDashboard, CreditCard, TrendingUp, Shield, Banknote,
  Settings, LogOut, User, ChevronRight, Home, BarChart3, HelpCircle, 
  Building2, Smartphone
} from 'lucide-react';

const USER_NAV = [
  { label: 'Overview', path: '/dashboard/overview', icon: LayoutDashboard },
  { label: 'My Accounts', path: '/dashboard/accounts', icon: Building2 },
  { label: 'Transactions', path: '/dashboard/transactions', icon: BarChart3 },
  { label: 'Cards', path: '/dashboard/cards', icon: CreditCard },
  { label: 'Loans', path: '/dashboard/loans', icon: Banknote },
  { label: 'Investments', path: '/dashboard/investments', icon: TrendingUp },
  { label: 'Insurance', path: '/dashboard/insurance', icon: Shield },
  { label: 'Payments', path: '/dashboard/payments', icon: Smartphone },
  { label: 'Settings', path: '/dashboard/settings', icon: Settings },
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

export default function Sidebar({ sidebarOpen, isAdmin }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = isAdmin ? ADMIN_NAV : USER_NAV;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <aside
      className={`sidebar flex flex-col z-50 ${sidebarOpen ? 'open' : ''}`}
      style={{ transform: sidebarOpen ? 'translateX(0)' : undefined }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/10 sticky top-0 bg-navy z-10">
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
      <div className="p-4 mx-3 mt-4 rounded-xl bg-white/6 border border-white/8 shrink-0">
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
      <nav className="p-4 space-y-1 mt-2 flex-1">
        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink 
            key={label} 
            to={path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {({ isActive }) => (
              <>
                <Icon size={18} />
                <span>{label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto opacity-60" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/8 space-y-1 mt-auto shrink-0 bg-navy sticky bottom-0">
        <Link to="/" className="nav-item">
          <Home size={18} />
          <span>Back to Home</span>
        </Link>
        <button onClick={handleLogout} className="nav-item w-full text-red-400 hover:bg-red-500/15 hover:text-red-300 transition-colors">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
