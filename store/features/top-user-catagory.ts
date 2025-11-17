import { api } from "./baseQuery";

const topUserCatagoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserByCatagory: builder.query({
      query: () => "/top-users-category-wise/20",
      providesTags: ["top-user-catagory"],
    }),
  }),
});

export const { useGetUserByCatagoryQuery } = topUserCatagoryApi;
