
import { configureStore } from '@reduxjs/toolkit';
import receiptReducer from './features/receipts/receiptSlice';
import userReducer from './features/users/userSlice';

const store = configureStore({
  reducer: {
    receipt: receiptReducer,
    user: userReducer,
  }
});

export default store;