import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterSwitch: false,
  userReceipts: [
  ],
  filteredReceipts: [
  ],
}

export const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    filterToggle: (state) => {
      state.filterSwitch? state.filterSwitch = false : state.filterSwitch = true;
    },
    setUserReceipts: (state, action) => {
      state.userReceipts = [...action.payload];
    },
    setFilteredReceipts: (state, action) => {
      state.filteredReceipts = [...action.payload];
    },
    addStateReceipt: (state, action) => {
      state.userReceipts.push(action.payload)
    },
    editStateReceipt: (state, action) => {
      const receiptIndex = state.userReceipts.findIndex(receipt => receipt.id === action.payload.id)
      if (receiptIndex >= 0) {
        state.userReceipts.splice(receiptIndex, 1, action.payload);
      }
    },
    deleteStateReceipt: (state, action) => {
      const filteredReceipts = state.userReceipts.filter(receipt => {
        if(receipt.id !== action.payload) {
          return receipt;
        }
        return;
      })
      state.userReceipts = filteredReceipts;
      // state.receipts = filteredReceipts.filter(receipt => {
      //   receipt !== false
      // })
    },
  },
})


export const { filterToggle, setUserReceipts, setFilteredReceipts, addStateReceipt, editStateReceipt, deleteStateReceipt } = receiptSlice.actions

export default receiptSlice.reducer