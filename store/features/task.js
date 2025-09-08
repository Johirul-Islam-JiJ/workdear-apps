import { config } from "../../config";
import { api } from "./baseQuery";

api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (body) => ({
        url: `/my-task?paginate=${config.dataLimit}`,
        method: "POST",
        body: body,
      }),
      providesTags: ["tasks"],
    }),
  }),
});

export const { useGetTasksQuery } = api;
