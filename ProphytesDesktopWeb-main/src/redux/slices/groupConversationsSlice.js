import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
};

const groupConversationsSlice = createSlice({
  name: "groupConversation",
  initialState,
  reducers: {
    setgroupConversations: (state, action) => {
      state.conversations = action.payload;
    },
  },
});

export const { setgroupConversations } = groupConversationsSlice.actions;
export default groupConversationsSlice.reducer;
