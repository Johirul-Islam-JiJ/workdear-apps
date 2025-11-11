import { api } from "./baseQuery";

const contentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFaqContent: builder.query<any, void>({
      query: () => `/faqs`,
      providesTags: ["faqs"],
    }),
  }),
});

export const { useGetFaqContentQuery } = contentApi;
