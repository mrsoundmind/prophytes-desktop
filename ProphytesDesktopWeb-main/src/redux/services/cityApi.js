import { API_ROUTES } from "@/src/configs/constants";
import api from "./api";

export const cityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCity: builder.query({
      query: ({ search = "", stateId, skip = 0, limit = 20 }) => {
        const params = new URLSearchParams();
        params.append("skip", skip);
        params.append("limit", limit);
        if (search) params.append("search", search);
        if (stateId) params.append("stateId", stateId);
        return `${API_ROUTES.CITIES}?${params.toString()}`;
      },
    }),

    getAllState: builder.query({
      query: ({ search, countryId, skip = 0, limit = 20 }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (countryId) params.append("countryId", countryId);
        params.append("skip", skip);
        params.append("limit", limit);

        return `${API_ROUTES.STATES}?${params.toString()}`;
      },
    }),

    getAllCountries: builder.query({
      query: ({ search = "", skip = 0, limit = 20 }) => {
        const params = new URLSearchParams();
        params.append("skip", skip);
        params.append("limit", limit);
        if (search) params.append("search", search);
        return `${API_ROUTES.COUNTRIES}?${params.toString()}`;
      },
    }),
  }),
});

export const {
  useGetAllCityQuery,
  useGetAllStateQuery,
  useGetAllCountriesQuery,
} = cityApi;
