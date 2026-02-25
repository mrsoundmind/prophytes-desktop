// src/redux/middleware/socketMiddleware.js
import { getSocket } from "@/src/socket";
import { conversationApi } from "../services/conversationApi";
import {
  setConversations,
  setGrpConversationDelete,
  setParticipants,
} from "../slices/conversationSlice";
import {
  addMessage,
  refetchMessage,
  updateMessageReactions,
  vouchReport,
} from "../slices/messageSlice";
import { setNotification } from "../slices/NotificationSlice";
import { setConnected } from "../slices/socketSlice";
import { userStopTyping, userTyping } from "../slices/typingSlice";
import { updateUserStatus } from "../slices/userSlice";

let listenersBound = false;

export const socketMiddleware = (store) => {
  const socket = getSocket();

  if (!listenersBound) {
    listenersBound = true;

    socket.on("connect", () => {
      // console.log("✅ Connected:", socket.id);
      store.dispatch(setConnected(true));
    });

    socket.on("disconnect", (reason) => {
      // console.log("❌ Disconnected:", reason);
      store.dispatch(setConnected(false));
    });

    socket.on("ON_NEW_MESSAGE", (data) => {
      store.dispatch(addMessage(data));
      store.dispatch(conversationApi.util.invalidateTags(["Message"]));
    });

    socket.on("ON_MESSAGE_REACT", (data) => {
      // console.log("ON_MESSAGE_REACT", data);
      store.dispatch(updateMessageReactions(data));
    });

    socket.on("ON_GROUP_CREATED", (data) => {
      // console.log("ON_GROUP_CREATED", data);
      store.dispatch(setConversations(data));
    });

    socket.on("ON_CONVERSATION_CREATED", (data) => {
      // console.log("ON_CONVERSATION_CREATED", data);
      store.dispatch(setConversations(data));
    });

    socket.on("ON_USER_TYPING", (data) => {
      store.dispatch(userTyping(data)); // { conversationId, userId }
    });

    socket.on("ON_USER_STOP_TYPING", (data) => {
      store.dispatch(userStopTyping(data)); // { conversationId, userId }
    });

    socket.on("ON_CONVERSATION_LISTS", (data) => {
      // console.log("ON_CONVERSATION_LISTS", data);
      store.dispatch(setParticipants(data));
    });

    socket.on("notification", (data) => {
      store.dispatch(setNotification(data));
    });

    socket.on("ON_USER_VERIFIED", () => {
      // console.log("ON_USER_VERIFIED");
      store.dispatch(updateUserStatus(true));
    });

    socket.on("ON_CONVERSATION_HISTORY_CLEARED", () => {
      store.dispatch(refetchMessage(true));
    });

    socket.on("ON_GROUP_DELETED", (data) => {
      // console.log("ON_GROUP_DELETED", data);
      store.dispatch(setGrpConversationDelete(data.id));
    });

    socket.on("ON_VERIFICATION_UPDATED", (data) => {
      // console.log("ON_VERIFICATION_UPDATED", data);
      store.dispatch(vouchReport({ verificationId: data.verificationId }));
    });

    socket.on("connect_error", (err) => {
      console.warn("⚠️ [Socket] Connect Error (expected if backend offline):", err?.message || err);
    });
  }

  return (next) => (action) => {
    const result = next(action);
    switch (action.type) {
      case "auth/logoutSuccess": {
        const s = getSocket();
        if (s.connected) s.disconnect();
        s.auth = {};
        break;
      }
      case "auth/loginSuccess":
      case "auth/refreshTokenSuccess": {
        const s = getSocket();
        s.setAuthAndConnect?.();
        break;
      }
      default:
        break;
    }
    return result;
  };
};
