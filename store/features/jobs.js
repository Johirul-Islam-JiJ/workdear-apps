import { config } from "../../config";
import { api } from "./baseQuery";

api.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => ({
        url: "/countries",
        method: "GET",
      }),
      providesTags: ["countries"],
    }),

    getCatagory: builder.query({
      query: () => ({
        url: "/job-categories",
        method: "GET",
      }),
      providesTags: ["countries"],
    }),

    getJobsSubCategory: builder.query({
      query: () => ({
        url: `/job-sub-categories`,
        method: "GET",
      }),
    }),

    createJob: builder.mutation({
      query: (data) => ({
        url: "/jobs/store",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobs"],
    }),

    findJobs: builder.query({
      query: (data) => ({
        url: `/jobs/find-jobs?paginate=${config.dataLimit}`,
        method: "POST",
        body: data,
      }),
      providesTags: ["alljobs"],
    }),

    jobbyid: builder.query({
      query: (id) => ({
        url: `/jobs/job/${id}`,
        method: "GET",
      }),
    }),

    getJobsByCategory: builder.query({
      query: () => ({
        url: `/job-categories`,
        method: "GET",
      }),
      providesTags: ["categories"],
    }),

    updateJob: builder.mutation({
      query: (data) => ({
        url: "/jobs/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobs"],
    }),

    getMyJobs: builder.query({
      query: ({ page, status }) => ({
        url: `/jobs/my-jobs?paginate=${config.dataLimit}&page=${page}&status=${status}`,
        method: "GET",
      }),
      providesTags: ["jobs"],
    }),

    deleteJob: builder.mutation({
      query: (data) => ({
        url: `/jobs/destroy`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobs"],
    }),
    boostJob: builder.mutation({
      query: (data) => ({
        url: `/promotions/boost`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobs", "profile", "alljobs"],
    }),

    pinJob: builder.mutation({
      query: (data) => ({
        url: `/promotions/pin`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobs", "profile", "alljobs"],
    }),
    jobSubmission: builder.mutation({
      query: (data) => ({
        url: "/job-submissions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["alljobs", "tasks"],
    }),
    getcontinent: builder.query({
      query: () => ({
        url: "/country-categories",
        method: "GET",
      }),
    }),
    getcountry: builder.query({
      query: () => ({
        url: "/countries",
        method: "GET",
      }),
    }),

    playAndPauseJob: builder.mutation({
      query: (id) => ({
        url: `jobs/toggle-pause/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["alljobs", "jobs"],
    }),

    reportJob: builder.mutation({
      query: (data) => ({
        url: "/reports/store/job",
        method: "POST",
        body: data,
      }),
    }),
    reportSubmission: builder.mutation({
      query: (data) => ({
        url: "/reports/store/job-submission",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useCreateJobMutation,
  useGetMyJobsQuery,
  useDeleteJobMutation,
  useUpdateJobMutation,
  useGetCatagoryQuery,
  useJobbyidQuery,
  useGetJobsByCategoryQuery,
  useGetJobsSubCategoryQuery,
  useBoostJobMutation,
  usePinJobMutation,
  useFindJobsQuery,
  useJobSubmissionMutation,
  useGetcontinentQuery,
  useGetcountryQuery,
  usePlayAndPauseJobMutation,
  useReportJobMutation,
  useReportSubmissionMutation,
} = api;
