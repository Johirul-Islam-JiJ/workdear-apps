import { api } from "./baseQuery";

api.injectEndpoints({
  endpoints: (builder) => ({
    depositeWithdraw: builder.mutation({
      query: (data) => ({
        url: "/deposit-withdraw-manual",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useDepositeWithdrawMutation } = api;
