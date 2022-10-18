
import { configureStore } from '@reduxjs/toolkit';
import receiptReducer from './features/receipts/receiptSlice';

const store = configureStore({
  reducer: {
    receipt: receiptReducer,
  }
});

export default store;