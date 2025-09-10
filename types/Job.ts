import { User } from "./User";

export type QuestionCondition = {
  id: number;
  answer_type: string;
  text: string;
  condition: {
    operator: string;
    value: string;
  };
};

export type RequiredProofs = {
  type: string;
  description: string;
};

export type Steps = {
  step_number: number;
  instruction: string;
};

type Country = {
  country_code: null | string;
  country_name: string;
  created_at: string;
  deleted_at: null;
  id: number;
  pivot: {
    country_id: string;
    job_id: string;
  };
  updated_at: string;
};

type Report = {
  id: number;
};

type JobPromotion = {
  id: number;
};

export enum JobStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  DRAFT = "DRAFT",
  COMPLETED = "COMPLETED",
  CLOSED = "CLOSED",
}

type SubmissionInformation = {
  APPROVED: number;
  REJECTED: number;
  REQUIRED_JOB_WORKER: number;
  TOTAL_SUBMISSIONS: number;
  UNDER_REVIEW: number;
};

type JobSubCategory = {
  id: number;
  sub_category_name: string;
  parent_category_id: number;
  minimum_pay: string;
  status: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  parent_category: {
    id: number;
    category_name: string;
    deleted_at: null;
    created_at: string;
    updated_at: string;
  };
};

export interface Job {
  countries: Country[];
  created_at: string;
  deleted_at: null;
  description: string;
  end_date: string;
  estimated_day: string;
  id: number;
  is_boosted: boolean;
  is_pinned: boolean;
  job_code: string;
  job_sub_category: JobSubCategory;
  job_sub_category_id: number;
  pause: string;
  pay_per_task: string;
  provider: User;
  provider_id: number;
  question_condition: string;
  reports: Report[];
  require_screenshots: string;
  required_proofs: string;
  slug: string;
  start_date: string;
  status: JobStatus;
  steps: string;
  submission_information: SubmissionInformation;
  thumbnail_url: string;
  title: string;
  total_workers_required: number;
  updated_at: string;
  job_promotions: JobPromotion[];
}

export type JobList = {
  data: Job[];
};
