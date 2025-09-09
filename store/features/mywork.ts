import {api} from "./baseQuery";



api.injectEndpoints({
  endpoints: (builder) => ({
    getMyTask: builder.query({
      query: () => ({
        url: "/my-task",
        method: "GET",
      }),
    }),

    getAcceptedTask: builder.query({
      query: () => ({
        url: "/accepted-task",
        method: "GET",
      }),
    })



  }),
});


export const { useGetMyTaskQuery, useGetAcceptedTaskQuery } = api;