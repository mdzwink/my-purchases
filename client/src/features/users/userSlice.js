import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.users = {
        user: action.payload,
      }
    }
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer