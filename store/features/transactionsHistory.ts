import { api } from "./baseQuery";




api.injectEndpoints({
  endpoints: (builder) => ({
    getDepositeHistory: builder.query({
      query: () => ({
        url: "/transaction-history-deposit/2",
        method: "GET",
      }),
    }),

    getWithdrawHistory: builder.query({
      query: () => ({
        url: "/transaction-history-withdrawal/2",
        method: "GET",
      }),
    })



  }),
});


