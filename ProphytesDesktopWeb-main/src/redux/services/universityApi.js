import { API_ROUTES } from "@/src/configs/constants";
import api from "./api";

export const universityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUniversities: builder.query({
      query: ({ search, skip = 0, limit = 20 }) => {
        const params = new URLSearchParams();
        params.append("skip", skip);
        params.append("limit", limit);
        if (search) params.append("search", search);
        return `${API_ROUTES.VERSITIES}?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetAllUniversitiesQuery } = universityApi;
