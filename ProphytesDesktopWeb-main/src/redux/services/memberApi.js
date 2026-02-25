import { API_ROUTES } from "@/src/configs/constants";
import api from "./api";

export const memberApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMemberById: builder.query({
      query: (id) => `${API_ROUTES.MEMBERS}/${id}`,
      providesTags: (result, error, memberId) => [
        { type: "Member", id: "LIST" },
        { type: "Member", id: memberId },
      ],
    }),
    getMembersDirectory: builder.query({
      query: () => `${API_ROUTES.MEMBERS_DIRECTORY}`,
      providesTags: [{ type: "Members-Directory" }],
    }),
    getMembers: builder.query({
      query: ({ search, initial, orgId, page = 1, limit = 10 }) => {
        const params = new URLSearchParams();
        params.append("skip", page - 1);
        params.append("limit", limit);
        initial && params.append("initial", initial);
        search && params.append("search", search);
        if (orgId) params.append("organizationId", orgId);
        return `${API_ROUTES.MEMBERS}?${params.toString()}`;
      },
      providesTags: [{ type: "Members", id: "LIST" }],
    }),
  }),
});

export const {
  useGetMemberByIdQuery,
  useGetMembersDirectoryQuery,
  useGetMembersQuery,
} = memberApi;
