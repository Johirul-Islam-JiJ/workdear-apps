import { JobStatus } from "./Job";

export type MyJob = {
  id: number;
  slug: string;
  job_code: string;
  title: string;
  description: string;
  tag_line: string;
  pay_per_task: string;
  total_workers_required: number;
  estimated_day: string;
  start_date: string;
  end_date: string;
  status: JobStatus;
  is_boosted: boolean;
  is_pinned: boolean;
  pause: string;
  thumbnail_url: string;
  keywords: string[];
  steps: { step_number: number; instruction: string }[];
  required_proofs: { type: string; description: string }[];
  submission_information: {
    TOTAL_SUBMISSIONS: number;
    APPROVED: number;
    REJECTED: number;
    UNDER_REVIEW: string;
    REQUIRED_JOB_WORKER: number;
  };
  impression_count: string;
  click_count: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type MyJobStatistics = {
  active_jobs: number;
  expired_jobs: number;
  got_reports: number;
  got_total_submission: number;
  inactive_jobs: number;
  pending_jobs: number;
  total_expected_worker: string;
  total_job: number;
  total_promotion_cost: number;
  total_satisfied_count: number;
  total_spent: number;
  total_unsatisfied_count: number;
};

export enum TaskStatus {
  SATISFIED = "SATISFIED",
  UNSATISFIED = "UNSATISFIED",
  UNDER_REVIEW = "UNDER_REVIEW",
}

export type JobSubmission = {
  date: string;
  id: number;
  proof_data: string;
  status: TaskStatus;
  submitted_user_id: number;
};

export type JobSubmissionResponse = {
  current_page: number;
  data: JobSubmission[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    active: boolean;
    label: string;
    url: string | null;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type SingleJobSummary = {
  click_count: string;
  id: number;
  impression_count: string;
  is_boosted: boolean;
  is_paused: boolean;
  is_pinned: boolean;
  job_end_date: string;
  job_status: JobStatus;
  pay_per_task: string;
  provider_id: number;
  remaining_review: string;
  title: string;
  total_report_count: number;
  total_satisfied_count: number;
  total_submission: number;
  total_unsatisfied_count: number;
  total_worker_required: number;
};
