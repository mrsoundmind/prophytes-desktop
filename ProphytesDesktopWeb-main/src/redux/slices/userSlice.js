import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    status: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setReduxToken: (state, action) => {
      state.token = action.payload;
    },

    updateUserStatus: (state, action) => {
      state.status = action.payload
    }
  },
});

export const { setReduxToken, updateUserStatus } = user.actions;
export default user.reducer;
