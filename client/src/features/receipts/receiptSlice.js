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
    addStateReceipt: (state, action) => {
      state.receipts.push(action.payload);
    },
    deleteStateReceipt: (state, action) => {
      const filteredReceipts = state.receipts.filter(receipt => {
        if(receipt.id !== action.payload) {
          return receipt;
        }
        return;
      })
      state.receipts = filteredReceipts;
      // state.receipts = filteredReceipts.filter(receipt => {
      //   receipt !== false
      // })
    },
  },
})


export const { setReceiptState, addStateReceipt, deleteStateReceipt } = receiptSlice.actions

export default receiptSlice.reducer