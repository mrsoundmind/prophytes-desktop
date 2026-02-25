import { API_ROUTES } from "@/src/configs/constants";
import { skipToken } from "@reduxjs/toolkit/query";
import { api } from "./api";

export const conversationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    acceptConversation: builder.mutation({
      query: ({ conversationId, type }) => {
        const params = new URLSearchParams();
        params.append("conversationId", conversationId);
        params.append("type", type);
        return {
          url: `${API_ROUTES.ACCEPT_CONVERSION}?${params.toString()}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["ConversationReq", "Message", "msgCount"],
    }),
    conversationRequests: builder.query({
      query: ({ name, type }) => {
        const params = new URLSearchParams();
        name && params.append("name", name);
        type && params.append("type", type);
        return {
          url: `${API_ROUTES.CONVERSION_REQUESTS}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["ConversationReq"],
    }),

    allConversations: builder.query({
      query: ({ skip = 0, limit = 10, type, name }) => {
        const params = new URLSearchParams();
        params.append("skip", skip);
        params.append("limit", limit);
        type && params.append("type", type);
        name && params.append("name", name);

        return {
          url: `${API_ROUTES.ALL_CONVERSATIONS}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Message"],
    }),

    declineConversation: builder.mutation({
      query: ({ conversationId, type }) => {
        const params = new URLSearchParams();
        params.append("conversationId", conversationId);
        params.append("type", type);
        return {
          url: `${API_ROUTES.DECLINE_CONVERSION}?${params.toString()}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["ConversationReq", "msgCount"],
    }),

    deleteConversation: builder.mutation({
      query: ({ conversationId, type }) => {
        const params = new URLSearchParams();
        params.append("conversationId", conversationId);
        params.append("type", type);
        return {
          url: `${API_ROUTES.DELETE_CONVERSATION}?${params.toString()}`,
          method: "DELETE",
        };
      },
    }),

    newConversation: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.NEW_CONVERSATION,
        method: "POST",
        body: payload,
      }),
      providesTags: ["Message"],
    }),

    updateConversation: builder.mutation({
      query: ({ body, conversationId }) => {
        const params = new URLSearchParams();
        params.append("conversationId", conversationId);
        return {
          url: `${API_ROUTES.UPDATE_CONVERSATION}?${params.toString()}`,
          method: "PUT",
          body,
        };
      },
    }),

    conversationById: builder.query({
      query: ({ conversationId }) => {
        if (conversationId?.startsWith("newchat-")) {
          return skipToken; // Skip the request for new chats
        }

        return {
          url: `${API_ROUTES.ALL_CONVERSATIONS}/${conversationId}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) =>
        arg.conversationId?.startsWith("newchat-") ? [] : ["Message"],
    }),
    conversationByReciever: builder.query({
      query: ({ recieverId }) => {
        return {
          url: `${API_ROUTES.CONVERSATIONBYRECEIVER}/${recieverId}`,
          method: "GET",
        };
      },
    }),

    createGroupConversation: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.CREATE_GROUP_CONVERSATION,
        method: "POST",
        body: payload,
      }),
      providesTags: ["Message"],
    }),

    groupInvitation: builder.query({
      query: ({ skip = 0, limit = 10, conversationId, name }) => {
        const params = new URLSearchParams();
        params.append("skip", skip);
        params.append("limit", limit);
        params.append("conversationId", conversationId);
        name && params.append("name", name);
        return {
          url: `${API_ROUTES.GROUP_INVITATION}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Invite-lists"],
    }),

    leaveGroup: builder.mutation({
      query: ({ conversationId }) => {
        const params = new URLSearchParams();
        params.append("conversationId", conversationId);
        return {
          url: `${API_ROUTES.LEAVE_GROUP}?${params.toString()}`,
          method: "DELETE",
        };
      },
    }),
    updateGroupConversation: builder.mutation({
      query: ({ body, conversationId }) => {
        const params = new URLSearchParams();
        params.append("conversationId", conversationId);
        return {
          url: `${API_ROUTES.UPDATE_CONVERSATION}?${params.toString()}`,
          method: "PUT",
          body,
        };
      },
    }),
    updateGroupName: builder.mutation({
      query: (payload) => {
        const { id, ...body } = payload;
        return {
          url: `${API_ROUTES.EDIT_GROUP_NAME}/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Message"],
    }),

    groupConversationById: builder.query({
      query: ({ id }) => {
        const isNewchat = id?.startsWith("newchat-") ? true : false;

        if (isNewchat) {
          return skipToken;
        }
        return {
          url: `${API_ROUTES.GET_GROUPCONVERSATION_BY_ID}/${id}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) =>
        arg.id?.startsWith("newchat-") ? [] : ["Message"],
    }),

    chapterConversationById: builder.query({
      query: ({ conversationId }) => {
        return {
          url: `${API_ROUTES.GET_CHAPTERCONVERSATION_BY_ID}/${conversationId}`,
          method: "GET",
        };
      },
      providesTags: ["Message"],
    }),

    orgConversationById: builder.query({
      query: ({ conversationId }) => {
        if (!conversationId) return skipToken;
        return {
          url: `${API_ROUTES.GET_ORGCONVERSATION_BY_ID}/${conversationId}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) =>
        arg.conversationId ? ["Message"] : [],
    }),

    inviteGroupConversation: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.GROUP_INVITATION,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Invite-lists"],
    }),

    unreadMessage: builder.query({
      query: () => {
        return {
          url: `${API_ROUTES.UNREAD_MESSAGE}`,
          method: "GET",
        };
      },
      invalidatesTags: ["Message"],
      providesTags: ["msgCount"],
    }),

    conversationAttachments: builder.query({
      query: ({ limit = 10, skip = 0, conversationId, type }) => {
        if (!conversationId) return;
        const params = new URLSearchParams();
        params.append("skip", skip);
        params.append("limit", limit);
        conversationId && params.append("conversationId", conversationId);
        type && params.append("type", type);
        return {
          url: `${API_ROUTES.CONVERSATION_ATTACHMENTS}?${params.toString()}`,
          method: "GET",
        };
      },
      invalidatesTags: ["Message"],
    }),

    clearHistory: builder.mutation({
      query: ({ id }) => {
        return {
          url: `${API_ROUTES.CLEAR_CONVERSATION_HISTORY}/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["Message"],
    }),

    chapterUserVerify: builder.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.CHAPTER_USER_VERIFICATION,
          method: "POST",
          body: payload,
        };
      },
    }),

    chapterUserReport: builder.mutation({
      query: ({ id }) => {
        return {
          url: `${API_ROUTES.CHAPTER_USER}/${id}`,
          method: "DELETE",
        };
      },
    }),

    getChapterVerification: builder.query({
      query: ({ id }) => {
        return {
          url: `${API_ROUTES.CHAPTER_USER}/${id}`,
          method: "GET",
        };
      },
    }),

    submitForReview: builder.mutation({
      query: ({ verificationId }) => {
        return {
          url: `${API_ROUTES.CHAPTER_USER_SUBMIT_FOR_REVIEW}`,
          method: "POST",
          body: { verificationId },
        };
      },
    }),

    enterChapterVerification: builder.mutation({
      query: ({ verificationId }) => {
        return {
          url: `${API_ROUTES.CHAPTER_USER_ENTER}`,
          method: "POST",
          body: { verificationId },
        };
      },
    }),
  }),
});

export const {
  useAcceptConversationMutation,
  useLazyConversationRequestsQuery,
  useConversationRequestsQuery,
  useAllConversationsQuery,
  useLazyAllConversationsQuery,
  useDeclineConversationMutation,
  useDeleteConversationMutation,
  useNewConversationMutation,
  useUpdateConversationMutation,
  useConversationByIdQuery,
  useLazyConversationByIdQuery,
  useConversationByRecieverQuery,
  useLazyConversationByRecieverQuery,
  useCreateGroupConversationMutation,
  useGroupInvitationQuery,
  useLeaveGroupMutation,
  useUpdateGroupConversationMutation,
  useUpdateGroupNameMutation,
  useGroupConversationByIdQuery,
  useLazyGroupConversationByIdQuery,
  useInviteGroupConversationMutation,
  useUnreadMessageQuery,
  useConversationAttachmentsQuery,
  useChapterConversationByIdQuery,
  useLazyChapterConversationByIdQuery,
  useLazyOrgConversationByIdQuery,
  useClearHistoryMutation,
  useChapterUserVerifyMutation,
  useChapterUserReportMutation,
  useGetChapterVerificationQuery,
  useLazyGetChapterVerificationQuery,
  useSubmitForReviewMutation,
  useEnterChapterVerificationMutation,
} = conversationApi;
