import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { items: [], unreadCount: 0 },
  reducers: {
    setNotifications: (state, action) => {
      state.items = action.payload;
      state.unreadCount = action.payload.filter(n => !n.isRead).length;
    },
    markAsRead: (state, action) => {
      const n = state.items.find(n => n._id === action.payload);
      if (n) { n.isRead = true; state.unreadCount = Math.max(0, state.unreadCount - 1); }
    },
    addNotification: (state, action) => {
      state.items.unshift(action.payload);
      if (!action.payload.isRead) state.unreadCount += 1;
    },
  },
});

export const { setNotifications, markAsRead, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
