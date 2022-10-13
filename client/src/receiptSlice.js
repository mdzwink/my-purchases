import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  receipts: [
    { user_id: 4, img: 'https://github.com/mdzwink/my-purchases/blob/main/client/public/docs/pexels-picjumbocom-196639.jpg?raw=true', store: 'Dillans Dough', date: '08-25-2022', return_by: '09-24-2022', total: 2250 },
    { user_id: 4, img: 'https://github.com/mdzwink/my-purchases/blob/main/client/public/docs/pexels-picjumbocom-196639.jpg?raw=true', store: 'Dillans Dough', date: '08-25-2022', return_by: '09-24-2022', total: 2250 },
    { user_id: 4, img: 'https://github.com/mdzwink/my-purchases/blob/main/client/public/docs/pexels-picjumbocom-196639.jpg?raw=true', store: 'Dillans Dough', date: '08-25-2022', return_by: '09-24-2022', total: 2250 }
  ],
}

export const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    addReceipt: (state, action) => {
      state.receipts = [...state, action.payload];
    },
  },
})

// export const rootReducer = (state = initState, action) => {
//   return state;
// }

export const { addReceipt } = receiptSlice.actions

export default receiptSlice