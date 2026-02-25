import { API_ROUTES } from "@/src/configs/constants";
import { api } from "./api";

export const uploadApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (data) => ({
        url: API_ROUTES.IMAGE_UPLOAD,
        method: "POST",
        body: data,
        "content-type": "multipart/form-data",
      }),
    }),

    stateApproved: builder.mutation({
      query: (data) => ({
        url: API_ROUTES.STATE_APPROVED,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUploadImageMutation, useStateApprovedMutation } = uploadApi;
