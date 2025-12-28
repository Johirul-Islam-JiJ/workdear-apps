import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout, setToken } from "../slices/user";
import { api } from "./baseQuery";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data?.data?.token));
          AsyncStorage.setItem("token", data?.data?.token);
        } catch (error) {
          console.log("Login mutation error:", error);
        }
      },
      invalidatesTags: [
        "profile",
        "notification-count",
        "notifications",
        "withdraw-history",
        "accepted-tasks",
        "tasks",
        "deposit-history",
        "playAndEarn",
        "jobs",
        "ads",
      ],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data?.data?.token));
          AsyncStorage.setItem("token", data?.data?.token);
        } catch (error) {
          console.log("Register mutation error:", error);
        }
      },
      invalidatesTags: [
        "profile",
        "notification-count",
        "notifications",
        "withdraw-history",
        "accepted-tasks",
        "tasks",
        "deposit-history",
        "playAndEarn",
        "jobs",
      ],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          AsyncStorage.removeItem("token");
        } catch (error) {
          console.log("Logout mutation error:", error);
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/get-profile",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/update-profile-information",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    updateSecurityCode: builder.mutation({
      query: (data) => ({
        url: "/update-security-code",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/update-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    updateProfilePicture: builder.mutation({
      query: (data) => ({
        url: "/update-user-profile-image",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    referrelPause: builder.mutation({
      query: () => ({
        url: "/referralPause",
        method: "POST",
      }),
      invalidatesTags: ["profile"],
    }),
    referredData: builder.query({
      query: () => ({
        url: "/referrer/affiliate-program",
        method: "GET",
      }),
    }),
    accountDelete: builder.mutation({
      query: (data) => ({
        url: "/request/account-deactivation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    updateAccountDelete: builder.mutation({
      query: (data) => ({
        url: "/update/account-deactivation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateSecurityCodeMutation,
  useUpdatePasswordMutation,
  useUpdateProfilePictureMutation,
  useLogoutMutation,
  useReferrelPauseMutation,
  useReferredDataQuery,
  useAccountDeleteMutation,
  useUpdateAccountDeleteMutation,
} = authApi;
