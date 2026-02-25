import { API_ROUTES } from "@/src/configs/constants";
import { api } from "./api";

export const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.SEND_MESSAGE,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Message"],
    }),

    allMessages: builder.query({
      query: ({ limit = 10, skip = 0, conversationId, type }) => {
        if (!conversationId || !type) return;
        const params = new URLSearchParams();
        params.append("skip", skip);
        params.append("limit", limit);
        conversationId && params.append("conversationId", conversationId);
        return {
          url: `${API_ROUTES.ALL_MESSAGES}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Reaction"],
    }),

    deleteMessage: builder.mutation({
      query: ({ msgId }) => ({
        url: `${API_ROUTES.DELETE_MESSAGE}/${msgId}`,
        method: "DELETE",
      }),
    }),

    updateMsg: builder.mutation({
      query: ({ body, msgId }) => {
        return {
          url: `${API_ROUTES.UPDATE_MESSAGE}/${msgId}`,
          method: "POST",
          body,
        };
      },
    }),

    sendGroupMsg: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.SEND_GROUP_MESSAGE,
        method: "POST",
        body: payload,
      }),
    }),
    messageReact: builder.mutation({
      query: (payload) => {
        const { id, ...body } = payload;
        return {
          url: `${API_ROUTES.MESSAGE_REACT}/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Reaction"],
    }),
  }),
});

export const {
  useAllMessagesQuery,
  useSendMessageMutation,
  useDeleteMessageMutation,
  useUpdateMsgMutation,
  useLazyAllMessagesQuery,
  useSendGroupMsgMutation,
  useMessageReactMutation,
} = messageApi;
