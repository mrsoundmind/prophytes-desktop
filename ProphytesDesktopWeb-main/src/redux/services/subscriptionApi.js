import { API_ROUTES } from "@/src/configs/constants";
import api from "./api";

export const subscriptionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    upgradePlan: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.UPGRADE_PLAN,
        method: "POST",
        body: payload,
      }),
    }),

    cancelSubscription: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.CANCEL_SUBSCRIPTION,
        method: "POST",
        body: payload,
      }),
    }),

    subscriptionDetails: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.SUBSCRIPTION_DETAILS,
        method: "POST",
        body: payload,
      }),
    }),

    invoices: builder.query({
      query: (payload) => ({
        url: API_ROUTES.INVOICES,
        method: "GET",
      }),
    }),

    stripeUpdateInfo: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.SUBSCRIPTION_UPDATE_INFO,
        method: "POST",
        body: payload,
      }),
    }),

    pricePlan: builder.query({
      query: () => ({
        url: API_ROUTES.STRIPE_PRICEPLAN,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSubscriptionDetailsMutation,
  useUpgradePlanMutation,
  useCancelSubscriptionMutation,
  useInvoicesQuery,
  useStripeUpdateInfoMutation,
  usePricePlanQuery,
} = subscriptionApi;
