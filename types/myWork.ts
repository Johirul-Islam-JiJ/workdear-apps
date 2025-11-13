import { Job } from "./Job";

export enum MyWorkStatus {
  UNDER_REVIEW = "UNDER_REVIEW",
  SATISFIED = "SATISFIED",
  UNSATISFIED = "UNSATISFIED",
}

export interface MyWork {
  job: {
    id: number;
    pay_per_task: string;
    slug: string;
    title: string;
  };
  task: {
    created_at: string;
    id: number;
    proof_data: string;
    status: MyWorkStatus;
  };
}

export interface MyWorkSummaryType {
  star_count: number;
  total_earn: number;
  total_review: number;
  total_satisfied_task: number;
  total_task: number;
  total_unsatisfied_task: number;
  under_review_task: number;
}

export interface JobSubmissionImage {
  created_at: string;
  id: number;
  image_path: string;
  job_submission_id: number;
  updated_at: string;
}

export interface MyWorkDetils {
  answer: null | string;
  created_at: string;
  deleted_at: null | string;
  id: number;
  job: Job;
  job_id: number;
  job_submission_image: JobSubmissionImage[];
  proof_data: string;
  rating: string;
  rejection_reason: null | string;
  report: null | string;
  reviewed_at: null | string;
  star_reason: null | string;
  status: MyWorkStatus;
  submitted_at: string;
  updated_at: string;
  worker_id: number;
}
