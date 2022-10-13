
import { configureStore } from '@reduxjs/toolkit';
import receiptSlice from './receiptSlice';

const store = configureStore({
  reducer: receiptSlice.reducer
});

export default store;