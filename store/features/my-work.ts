import { config } from "@/config/config";
import { api } from "./baseQuery";

const taskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (body) => ({
        url: `/my-task?paginate=${config.dataLimit}`,
        method: "POST",
        body: body,
      }),
      providesTags: ["tasks"],
    }),
    getTaskById: builder.query({
      query: (id) => ({
        url: `/my-task/show/${id}`,
        method: "GET",
      }),
      providesTags: ["single-tasks"],
    }),
  }),
});

export const { useGetTasksQuery, useGetTaskByIdQuery } = taskApi;
