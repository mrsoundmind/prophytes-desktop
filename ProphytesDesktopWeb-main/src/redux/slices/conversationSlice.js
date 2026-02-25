import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newConversation: {},
  participants: [],
  activeIndex: "All",
  grpConversationDelete: null,
};

const conversation = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.newConversation = action.payload;
    },

    setParticipants: (state, action) => {
      state.participants = action.payload;
    },
    setActiveIndex: (state, action) => {
      state.activeIndex = action.payload;
    },

    setGrpConversationDelete: (state, action) => {
      state.grpConversationDelete = action.payload;
    },
  },
});

export const { setConversations, setParticipants, setActiveIndex, setGrpConversationDelete } =
  conversation.actions;
export default conversation.reducer;
