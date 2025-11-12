import { config } from "@/config/config";
import { api } from "../baseQuery";

const checkTaskProfsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubmitedTaskProfs: builder.query({
      query: ({ id, page, filter }) => ({
        url: `/submittedCorrectAnswerTask/${id}?paginate=${config.dataLimit}&page=${page}&status=${filter}`,
        method: "GET",
      }),
      providesTags: ["getingSubmitedTaskProfs"],
    }),

    getSubmitedTaskByIdProfs: builder.query({
      query: (id) => ({
        url: `/submissionDetails/${id}`,
        method: "GET",
      }),
    }),

    giveTips: builder.mutation({
      query: (data) => ({
        url: "/submittedjob/tips",
        method: "POST",
        body: data,
      }),
    }),

    giveRatingToWorker: builder.mutation({
      query: (data) => ({
        url: "/submittedjob/star",
        method: "POST",
        body: data,
      }),
    }),

    setisfiedJobSingle: builder.mutation({
      query: (data) => ({
        url: "/submittedjob/setisfiction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getingSubmitedTaskProfs"],
    }),

    unsetisfiedJobSingle: builder.mutation({
      query: (data) => ({
        url: "/submittedjob/unsetisfiction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getingSubmitedTaskProfs"],
    }),

    setisfiedJobMultiple: builder.mutation({
      query: (data) => ({
        url: "submittedjob/setisfiction/multiple",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getingSubmitedTaskProfs"],
    }),

    unsetisfiedJobMultiple: builder.mutation({
      query: (data) => ({
        url: "/submittedjob/unsetisfiction/multiple",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getingSubmitedTaskProfs"],
    }),
  }),
});

export const {
  useGetAllSubmitedTaskProfsQuery,
  useGetSubmitedTaskByIdProfsQuery,
  useGiveTipsMutation,
  useGiveRatingToWorkerMutation,
  useSetisfiedJobSingleMutation,
  useUnsetisfiedJobSingleMutation,
  useSetisfiedJobMultipleMutation,
  useUnsetisfiedJobMultipleMutation,
} = checkTaskProfsApi;
