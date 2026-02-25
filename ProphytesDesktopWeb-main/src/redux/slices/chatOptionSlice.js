import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: "",
  editModalOpen: false,
  friendModalOpen: false,
};

const chatOptionSlice = createSlice({
  name: "chatOption",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setEditModalOpen: (state, action) => {
      state.editModalOpen = action.payload;
    },
    setFriendModalOpen: (state, action) => {
      state.friendModalOpen = action.payload;
    },
  },
});

export const { setActive, setEditModalOpen, setFriendModalOpen } =
  chatOptionSlice.actions;
export default chatOptionSlice.reducer;
