import { API_ROUTES } from "@/src/configs/constants";
import api from "./api";

export const chapterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChapter: builder.query({
      query: ({
        search,
        organization,
        university,
        initial,
        location,
        locationType,
        skip = 0,
        limit = 20,
      }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        university && params.append("university", university);
        initial && params.append("initial", initial);
        if (organization) params.append("organization", organization);
        if (location) params.append("location", location);
        if (locationType) params.append("locationType", locationType);
        params.append("skip", skip.toString());
        params.append("limit", limit.toString());
        return `${API_ROUTES.CHAPTERS}?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetChapterQuery } = chapterApi;
