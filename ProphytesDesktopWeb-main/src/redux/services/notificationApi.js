import { API_ROUTES } from "@/src/configs/constants";
import api from "./api";

export const notificationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: ({ userId, limit = 10, skip = 0, type, sort = "desc" }) => ({
        url: `${API_ROUTES.NOTIFICATIONS}`,
        params: {
          limit,
          skip,
          ...(type && { type }),
          sort,
        },
      }),
      providesTags: [
        { type: "Connection" },
        { type: "Notification", id: "LIST" },
      ],
    }),

    updateConnection: builder.mutation({
      query: ({ payload }) => {
        return {
          url: `${API_ROUTES.UPDATE_CONNECTION_REQUEST}`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "Connection" }],
    }),

    markNotificationAsRead: builder.mutation({
      query: (id) => ({
        url: `${API_ROUTES.NOTIFICATIONS}/${id}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Notification", id: "LIST" }],
    }),
    markAllNotificationsAsRead: builder.mutation({
      query: (body) => ({
        url: `${API_ROUTES.NOTIFICATIONS}/mark-all-read`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Notification", id: "LIST" }],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useUpdateConnectionMutation,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
} = notificationsApi;
