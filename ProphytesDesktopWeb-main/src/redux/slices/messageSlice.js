import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: {},
  reaction: {},
  refetchMessage: false,
  vouchReport: {
    verificationId: null,
  },
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.message = action.payload;
    },

    updateMessageReactions: (state, action) => {
      state.reaction = action.payload;
    },

    refetchMessage: (state, action) => {
      state.refetchMessage = action.payload;
    },
    vouchReport: (state, action) => {
      state.vouchReport = action.payload;
    },
  },
});

export const {
  addMessage,
  updateMessageReactions,
  refetchMessage,
  vouchReport,
} = messageSlice.actions;

export default messageSlice.reducer;
