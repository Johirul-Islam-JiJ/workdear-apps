import { ImagePickerAsset } from "expo-image-picker";
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

/**
 * Represents a required proof for a job submission.
 */
export type RequiredProofs = {
  type: string;
  description: string;
};

/**
 * Represents a single step in a job's instructions.
 */
export type Steps = {
  step_number: number;
  instruction: string;
};

type JobCountry = {
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

/**
 * Represents a report associated with a job.
 */
type Report = {
  id: number;
};

/**
 * Represents a promotion associated with a job.
 */
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
  countries: JobCountry[];
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
  data: {
    current_page: number;
    data: Job[];
    last_page: number;
    per_page: number;
    total: number;
  };
};

export type FindJobPayload = {
  job_category_id: number | null;
  country_ids: number[] | null;
  page: number;
  higest_pay: boolean;
  recent: boolean;
};

export interface SingleJobSubCategory {
  id: number;
  sub_category_name: string;
  parent_category_id: number;
  minimum_pay: string;
  status: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
}
export interface JobCategory {
  id: number;
  category_name: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  sub_categories: SingleJobSubCategory[];
}

export interface CountryCategory {
  id: number;
  country_category_name: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  pivot: {
    country_id: string;
    country_category_id: string;
  };
}

export interface Country {
  id: number;
  country_name: string;
  country_code: null;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  category: CountryCategory[];
}

export type Continent = {
  countries: Country[];
  country_category_name: string;
  id: number;
  created_at: string;
  updated_at: string;
};

export interface JobPostFirstForm {
  title: string;
  description: string;
  steps: string;
  required_proofs: string;
  question_condition: string;
  thumbnail: ImagePickerAsset | undefined;
}

export interface JobPostFinalForm {
  status: string;
  total_workers_required: number;
  pay_per_task: number;
  require_screenshots: number;
  estimated_day: number;
  job_category_id: number | null;
  job_sub_category_id: number | null;
  country_ids: number[];
  minimum_pay: string;
}

export interface JobPostForm {
  jobPostFirstForm: JobPostFirstForm;
  jobPostFinalForm: JobPostFinalForm;
}
