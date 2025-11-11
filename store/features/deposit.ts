import { api } from "./baseQuery";

const depositApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getmanualPaymentMethods: builder.query({
      query: (type) => ({
        url: `/available-payment-methods?type=${type}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetmanualPaymentMethodsQuery } = depositApi;
