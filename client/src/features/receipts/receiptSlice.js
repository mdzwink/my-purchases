import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  receipts: [
    {
    user_id: 4,
    img: 'https://github.com/mdzwink/my-purchases/blob/main/client/public/docs/pexels-picjumbocom-196639.jpg?raw=true',
    store: 'Dillans Dough',
    date: '08-25-2022',
    return_by: '09-24-2022', 
    total: 2250
    },
  ]
}

export const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    setReceiptState: (state, action) => {
      state.receipts = [...action.payload];
    },
    addReceipt: (state, action) => {
      state.receipts = [...action.payload];
    },
    deleteReceipt: (state, action) => {
      state.receipts = state.receipts.filter(receipt => {
        if(receipt !== action.payload) {
          return receipt;
        }
      })
    },
  },
})


export const { setReceiptState, addReceipt, deleteReceipt } = receiptSlice.actions

export default receiptSlice.reducer