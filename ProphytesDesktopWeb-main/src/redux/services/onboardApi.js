import { API_ROUTES } from "@/src/configs/constants";
import api from "./api";

export const onboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    onboard: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.ONBOADING,
        method: "POST",
        body: payload,
      }),
    })
  }),
});

export const { useOnboardMutation } = onboardApi;
