import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const getPageTitle = (pathname) => {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return 'Dashboard';
  const lastPart = parts[parts.length - 1];
  return lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace('-', ' ');
};

export default function Header({ setSidebarOpen }) {
  const { user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notifications);
  const location = useLocation();

  const title = getPageTitle(location.pathname);

  return (
    <header className="dashboard-header shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors text-navy"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-navy font-display">{title}</h1>
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
  );
}
