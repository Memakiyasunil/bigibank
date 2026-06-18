import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import { useSelector } from 'react-redux';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import HelpCenter from './pages/HelpCenter';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Service Pages
import PublicLoans from './pages/Loans';
import LoanApply from './pages/LoanApply';
import PublicInvestments from './pages/Investments';
import PublicInsurance from './pages/Insurance';
import PublicCards from './pages/Cards';
import Accounts from './pages/Accounts';
import DigitalBanking from './pages/DigitalBanking';
import Calculators from './pages/Calculators';

// Dashboard Pages
import Overview from './pages/dashboard/Overview';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import MyAccounts from './pages/dashboard/MyAccounts';
import Transactions from './pages/dashboard/Transactions';
import Cards from './pages/dashboard/Cards';
import Loans from './pages/dashboard/Loans';
import Investments from './pages/dashboard/Investments';
import Insurance from './pages/dashboard/Insurance';
import Payments from './pages/dashboard/Payments';
import Settings from './pages/dashboard/Settings';

// Protected Route wrapper
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && user?.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
};

const AppRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/loans-info" element={<PublicLoans />} />
        <Route path="/loans-info/apply" element={<LoanApply />} />
        <Route path="/investments-info" element={<PublicInvestments />} />
        <Route path="/insurance-info" element={<PublicInsurance />} />
        <Route path="/cards-info" element={<PublicCards />} />
        <Route path="/accounts-info" element={<Accounts />} />
        <Route path="/digital-banking" element={<DigitalBanking />} />
        <Route path="/calculators" element={<Calculators />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard/overview" replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="accounts" element={<MyAccounts />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="cards" element={<Cards />} />
        <Route path="loans" element={<Loans />} />
        <Route path="investments" element={<Investments />} />
        <Route path="insurance" element={<Insurance />} />
        <Route path="payments" element={<Payments />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <DashboardLayout isAdmin />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0B1F3A',
              color: '#fff',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#00C853', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#EF4444', secondary: '#fff' },
            },
          }}
        />
      </Router>
    </Provider>
  );
}

export default App;
