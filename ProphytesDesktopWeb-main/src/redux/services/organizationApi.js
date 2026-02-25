import { API_ROUTES } from "@/src/configs/constants";
import api from "./api";

export const organizationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrganizations: builder.query({
      query: () => {
        return `${API_ROUTES.ORGANIZATIONS}`;
      },
      providesTags: [{ type: "Organization", id: "LIST" }],
    }),
  }),
});

export const { useGetAllOrganizationsQuery } = organizationApi;
