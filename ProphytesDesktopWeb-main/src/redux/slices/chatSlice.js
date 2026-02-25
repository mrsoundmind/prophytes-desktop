import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: false,
  showChatFriendList: false,
  replyMessage: {
    messageId: "",
    message: "",
  },
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setShowChatFriendList: (state, action) => {
      state.showChatFriendList = action.payload;
    },
    setReplyMessage: (state, action) => {
      state.replyMessage = action.payload;
    },
  },
});

export const { setIsMobile, setShowChatFriendList, setReplyMessage } =
  chatSlice.actions;

export default chatSlice.reducer;
