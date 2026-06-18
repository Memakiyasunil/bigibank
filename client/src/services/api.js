import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Request interceptor – attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bigibank_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor – handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('bigibank_token');
      localStorage.removeItem('bigibank_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  sendOTP: (email) => api.post('/auth/send-otp', { email }),
  verifyOTP: (email, otp) => api.post('/auth/verify-otp', { email, otp }),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
};

// Account API
export const accountAPI = {
  getAccounts: () => api.get('/accounts'),
  getAccountById: (id) => api.get(`/accounts/${id}`),
  createAccount: (data) => api.post('/accounts', data),
  getTransactions: (id = 'all', params) => api.get(`/accounts/${id}/transactions`, { params }),
  transfer: (data) => api.post('/accounts/transfer', data),
};

// Loan API
export const loanAPI = {
  getLoans: () => api.get('/loans'),
  getLoanById: (id) => api.get(`/loans/${id}`),
  applyLoan: (data) => api.post('/loans/apply', data),
  calculateEMI: (params) => api.get('/loans/calculate-emi', { params }),
  getInterestRates: () => api.get('/loans/interest-rates'),
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params) => api.get('/admin/users', { params }),
  updateUserStatus: (id, data) => api.patch(`/admin/users/${id}/status`, data),
  getLoans: (params) => api.get('/admin/loans', { params }),
  approveLoan: (id, data) => api.patch(`/admin/loans/${id}/approve`, data),
  getTransactions: (params) => api.get('/admin/transactions', { params }),
  getTickets: (params) => api.get('/admin/tickets', { params }),
};

export default api;
