import { config } from "@/config/config";
import { ApiResponse } from "@/types/APIResponse";
import {
  Continent,
  Country,
  FindJobPayload,
  Job,
  JobCategory,
  JobList,
} from "@/types/Job";
import { api } from "./baseQuery";

export const jobsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getJobsForHome: builder.query<ApiResponse<Job[]>, void>({
      query: () => ({
        url: "/home/jobs",
        method: "GET",
      }),
      providesTags: ["jobs-home"],
    }),

    getCountries: builder.query({
      query: () => ({
        url: "/countries",
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

    findJobs: builder.query<JobList, FindJobPayload>({
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
      providesTags: ["single-jobs"],
    }),

    getJobsCategory: builder.query<ApiResponse<JobCategory[]>, void>({
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
    updateDaysAndWorker: builder.mutation({
      query: (data) => ({
        url: "/jobs/add-worker",
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
    getcontinent: builder.query<ApiResponse<Continent[]>, void>({
      query: () => ({
        url: "/country-categories",
        method: "GET",
      }),
    }),
    getcountry: builder.query<ApiResponse<Country[]>, void>({
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
  useGetJobsForHomeQuery,
  useGetCountriesQuery,
  useCreateJobMutation,
  useGetMyJobsQuery,
  useDeleteJobMutation,
  useUpdateJobMutation,
  useJobbyidQuery,
  useGetJobsCategoryQuery,
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
  useUpdateDaysAndWorkerMutation,
} = jobsApi;
