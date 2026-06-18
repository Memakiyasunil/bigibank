import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'account',
  initialState: { accounts: [], selectedAccount: null, transactions: [], loading: false, error: null },
  reducers: {
    setAccounts: (state, action) => { state.accounts = action.payload; },
    setSelectedAccount: (state, action) => { state.selectedAccount = action.payload; },
    setTransactions: (state, action) => { state.transactions = action.payload; },
    setLoading: (state, action) => { state.loading = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
    updateBalance: (state, action) => {
      const { accountId, balance } = action.payload;
      const acc = state.accounts.find(a => a._id === accountId);
      if (acc) acc.balance = balance;
    },
  },
});

export const { setAccounts, setSelectedAccount, setTransactions, setLoading, setError, updateBalance } = accountSlice.actions;
export default accountSlice.reducer;
