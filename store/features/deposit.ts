import { api } from "./baseQuery";

api.injectEndpoints({
  endpoints: (builder) => ({
    getmanualPaymentMethods: builder.query({
      query: (type) => ({
        url: `/available-payment-methods?type=${type}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetmanualPaymentMethodsQuery } = api;
