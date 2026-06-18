import { createSlice } from '@reduxjs/toolkit';

const userFromStorage = localStorage.getItem('bigibank_user')
  ? JSON.parse(localStorage.getItem('bigibank_user'))
  : null;

const tokenFromStorage = localStorage.getItem('bigibank_token') || null;

const initialState = {
  user: userFromStorage,
  token: tokenFromStorage,
  isAuthenticated: !!tokenFromStorage,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => { state.loading = true; state.error = null; },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('bigibank_token', action.payload.token);
      localStorage.setItem('bigibank_user', JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('bigibank_token');
      localStorage.removeItem('bigibank_user');
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('bigibank_user', JSON.stringify(state.user));
    },
    clearError: (state) => { state.error = null; },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUser, clearError } = authSlice.actions;
export default authSlice.reducer;
