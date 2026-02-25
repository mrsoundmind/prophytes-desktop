import { configureStore } from "@reduxjs/toolkit";
import onboardingPageReducer from "./slices/onboardingSlice";
import priceReducer from "./slices/priceSlice";
import chatReducer from "./slices/chatSlice";
import chatOptionReducer from "./slices/chatOptionSlice";
import groupConversationsReducer from "./slices/groupConversationsSlice";
import socketReducer from "./slices/socketSlice";
import messageReducer from "./slices/messageSlice";
import notificationReducer from "./slices/NotificationSlice";
import conversationReducer from "./slices/conversationSlice";
import userReducer from "./slices/userSlice";

import { api } from "./services/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { socketMiddleware } from "./middleware/socketMiddleware";
import typingUserReducer from "./slices/typingSlice";

export const store = configureStore({
  reducer: {
    onboardPage: onboardingPageReducer,
    price: priceReducer,
    chat: chatReducer,
    messages: messageReducer,
    notification: notificationReducer,
    chatOption: chatOptionReducer,
    groupConversation: groupConversationsReducer,
    conversation: conversationReducer,
    user: userReducer,
    typing: typingUserReducer,
    
    socket: socketReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, socketMiddleware),
});

setupListeners(store.dispatch);
