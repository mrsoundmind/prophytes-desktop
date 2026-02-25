import { API_ROUTES } from "@/src/configs/constants";
import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userInfoUpdate: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.UPDATE_USER_INFO,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["UserInfo"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: API_ROUTES.LOGOUT,
        method: "POST",
      }),
      invalidatesTags: ["UserInfo"],
    }),

    setToken: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.SET_TOKEN,
        method: "POST",
        body: payload,
      }),
    }),

    sendOtp: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.SEND_OTP,
        method: "POST",
        body: payload,
      }),
    }),

    deleteUser: builder.mutation({
      query: () => ({
        url: API_ROUTES.DELETE_USER,
        method: "POST",
      }),
    }),

    // sendOtpPhone: builder.mutation({
    //   query: (payload) => ({
    //     url: API_ROUTES.SEND_OTP_PHONE,
    //     method: "POST",
    //     body: payload,
    //   }),
    // }),
    sendOtpPhone: builder.mutation({
      query: ({ phoneNumber, type }) => {
        const params = new URLSearchParams();
        type && params.append("type", type);

        return {
          url: `${API_ROUTES.SEND_OTP_PHONE}?${params.toString()}`,
          method: "POST",
          body: { phoneNumber },
        };
      },
    }),

    sendCodeEmail: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.SEND_CODE_EMAIL,
        method: "POST",
        body: payload,
      }),
    }),

    verifyOtpLogin: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.VERIFY_OTP_LOGIN,
        method: "POST",
        body: payload,
      }),
    }),

    profileOtpVerify: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.PROFILE_OPT_VERIFICATION,
        method: "POST",
        body: payload,
      }),
    }),
    userInfo: builder.query({
      query: () => `${API_ROUTES.ME}`,
      providesTags: ["UserInfo"],
    }),
  }),
});

export const {
  useUserInfoQuery,
  useLogoutMutation,
  useUserInfoUpdateMutation,
  useSetTokenMutation,
  useSendOtpMutation,
  useDeleteUserMutation,
  useSendOtpPhoneMutation,
  useSendCodeEmailMutation,
  useVerifyOtpLoginMutation,
  useProfileOtpVerifyMutation,
} = userApi;
