import { api } from "./baseQuery";

api.injectEndpoints({
  endpoints: (builder) => ({
    getTicket: builder.query({
      query: () => ({
        url: "/daily-draws/V1/get-ticket-data",
        method: "GET",
      }),
      providesTags: ["ticket"],
    }),

    buyticket: builder.mutation({
      query: (data) => ({
        url: "/daily-draws/V1/ticket-purchase",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ticket", "profile"],
    }),
  }),
});

export const { useGetTicketQuery, useBuyticketMutation } = api;
