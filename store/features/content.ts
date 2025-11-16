import { api } from "./baseQuery";

const contentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFaqContent: builder.query<any, void>({
      query: () => `/faqs`,
      providesTags: ["faqs"],
    }),
    getPrivacyPolicy: builder.query<any, void>({
      query: () => `content/pages/privacy_policy`,
      providesTags: ["privacy-policy"],
    }),
    getRefundPolicy: builder.query<any, void>({
      query: () => `/content/pages/refund_policy`,
      providesTags: ["refund-policy"],
    }),
    getTermsAndConditions: builder.query<any, void>({
      query: () => `/content/pages/terms_conditions`,
      providesTags: ["terms-and-conditions"],
    }),
  }),
});

export const {
  useGetFaqContentQuery,
  useGetPrivacyPolicyQuery,
  useGetRefundPolicyQuery,
  useGetTermsAndConditionsQuery,
} = contentApi;
