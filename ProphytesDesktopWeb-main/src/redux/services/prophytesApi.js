import { API_ROUTES } from "@/src/configs/constants";
import api from "./api";

export const prophytesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProphytes: builder.query({
      query: ({ search, organization, skip = 0, limit = 20 }) => {
        const params = new URLSearchParams();
        params.append("skip", skip);
        params.append("limit", limit);
        if (search) params.append("search", search);
        if (organization) params.append("organization", organization);
        return `${API_ROUTES.FAMOUS_PROPHYTES}?${params.toString()}`;
      },
      providesTags: ["Prophtes"],
    }),
  }),
});

export const { useGetProphytesQuery } = prophytesApi;
