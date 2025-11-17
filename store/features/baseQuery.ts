import { config } from "@/config/config";
import { SerializedError } from "@reduxjs/toolkit";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export type ErrorData = {
  message: string;
};

export function isFetchBaseQueryError(
  error: FetchBaseQueryError | SerializedError
): error is FetchBaseQueryError & { data: ErrorData } {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as any).data === "object" &&
    (error as any).data !== null &&
    "message" in (error as any).data
  );
}

const apiFormDataUrl = [
  "/update-user-profile-image",
  "/advertisement/V1/store",
  "/verifications_manual",
  "/advertisement/V1/update",
  "/jobs/store",
  "/jobs/update",
  "/promotions/pin",
  "/job-submissions",
  "/deposit-withdraw-manual",
];

const isFormDataUrl = (formDataUrl: string[], url: string) => {
  return formDataUrl.some((path) => {
    const pattern = new RegExp(`^${path}(/|$)`);
    return pattern.test(url);
  });
};

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: config.apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      const url = typeof args === "string" ? args : args.url;
      if (!isFormDataUrl(apiFormDataUrl, url)) {
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");
      }
      headers.set("Accept", "application/json");
      headers.set("X-API-Key", config.apiKey as string);

      return headers;
    },
  });

  return rawBaseQuery(args, api, extraOptions);
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    "countries",
    "profile",
    "ads",
    "deposit-history",
    "withdraw-history",
    "notification-count",
    "notifications",
    "jobs",
    "alljobs",
    "ads-cost",
    "accepted-tasks",
    "tasks",
    "deleteJob",
    "ticket",
    "generalData",
    "playAndEarn",
    "categories",
    "costCenter",
    "blogs",
    "blogs-categories",
    "jobs-home",
    "faqs",
    "single-jobs",
    "getingSubmitedTaskProfs",
    "single-tasks",
    "privacy-policy",
    "refund-policy",
    "terms-and-conditions",
    "cancelation-policy",
    "single-blogs",
  ],
  endpoints: () => ({}),
});

const supportFormDataUrl = ["/files/upload"];

const baseQueryLiveSupport: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: config.liveSupportApiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      const url = typeof args === "string" ? args : args.url;
      if (!isFormDataUrl(supportFormDataUrl, url)) {
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");
      }
      headers.set("Accept", "application/json");

      return headers;
    },
  });

  return rawBaseQuery(args, api, extraOptions);
};

export const liveSupportApi = createApi({
  reducerPath: "liveSupportApi",
  baseQuery: baseQueryLiveSupport,
  tagTypes: ["liveSupport"],
  endpoints: () => ({}),
});
