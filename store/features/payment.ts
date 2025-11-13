import { config } from "@/config/config";
import { api } from "./baseQuery";

const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDepositTransactionHistory: builder.query({
      query: ({ page, status }) => ({
        url: `/pendingDepositsOrWithdrawals?pagination=${config.dataLimit}&page=${page}&type=deposit&status=${status}`,
        method: "GET",
      }),
      providesTags: ["deposit-history"],
    }),
    getWithdrawTransactionHistory: builder.query({
      query: ({ page, status }) => ({
        url: `/pendingDepositsOrWithdrawals?pagination=${config.dataLimit}&page=${page}&type=withdraw&status=${status}`,
        method: "GET",
      }),
      providesTags: ["withdraw-history"],
    }),
  }),
});

export const {
  useGetDepositTransactionHistoryQuery,
  useGetWithdrawTransactionHistoryQuery,
} = paymentApi;
