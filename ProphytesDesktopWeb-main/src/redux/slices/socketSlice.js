// src/redux/slices/socketSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  connected: false,
  messages: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
  },
});

export const { setConnected } = socketSlice.actions;
export default socketSlice.reducer;
