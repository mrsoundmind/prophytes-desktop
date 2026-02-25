import { createSlice } from "@reduxjs/toolkit";

const typingSlice = createSlice({
  name: "typing",
  initialState: { typingUsers: {} }, // { conversationId: [ {id, fullName, avatar} ] }
  reducers: {
    userTyping: (state, action) => {
      const { conversationId, ...user } = action.payload; // user = { id, fullName, avatar }
      if (!state.typingUsers[conversationId]) {
        state.typingUsers[conversationId] = [];
      }
      const exists = state.typingUsers[conversationId].some(
        (u) => u.id === user.id
      );
      if (!exists) {
        state.typingUsers[conversationId].push(user);
      }
    },
    userStopTyping: (state, action) => {
      const { conversationId, id: userId } = action.payload;
      if (state.typingUsers[conversationId]) {
        state.typingUsers[conversationId] = state.typingUsers[conversationId].filter(
          (u) => u.id !== userId
        );
      }
    },
  },
});

export const { userTyping, userStopTyping } = typingSlice.actions;
export default typingSlice.reducer;
