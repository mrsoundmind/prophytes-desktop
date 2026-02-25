import { API_ROUTES } from "@/src/configs/constants";
import api from "./api";

export const connectionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConnectionStatus: builder.query({
      query: (memberId) =>
        `${API_ROUTES.MEMBERS_CONNECTION_REQUEST}/${memberId}`,
      providesTags: (result, error, memberId) => [
        { type: "Connection", id: "LIST" },
        { type: "Connection", id: memberId },
      ],
    }),
    sendConnectionRequest: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.MEMBERS_CONNECTION_REQUEST,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error, { requestTo }) => [
        { type: "Connection", id: "LIST" },
        { type: "Connection", id: requestTo },
      ],
    }),

    allConnection: builder.query({
      query: ({ skip = 0, limit = 20, name }) => {
        const params = new URLSearchParams();
        params.append("skip", skip);
        params.append("limit", limit);
        name && params.append("name", name);
        return {
          url: `${API_ROUTES.ALL_CONNECTIONS}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Connection"],
    }),
  }),
});

export const {
  useGetConnectionStatusQuery,
  useSendConnectionRequestMutation,
  useAllConnectionQuery,
  useLazyGetConnectionStatusQuery,
} = connectionsApi;
