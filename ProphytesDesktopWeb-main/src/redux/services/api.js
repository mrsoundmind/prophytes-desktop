import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Connection",
    "Notification",
    "UserInfo",
    "Organization",
    "Prophtes",
    "Members-Directory",
    "Member",
    "Members",
    "Message",
    "Reaction",
    "ConversationReq",
    "Invite-lists",
    "msgCount",
  ], // Define tag types for cache invalidation
  // refetchOnFocus: true, // Refetch data when the window is focused
  // refetchOnReconnect: true, // Refetch data when the network reconnects
  // refetchOnMountOrArgChange: true, // Refetch data when the component mounts or arguments change
  // keepUnusedDataFor: 60, // Keep unused data in cache for 60 seconds
  endpoints: (builder) => ({}), // Empty, extended by injected endpoints
});

export default api;
