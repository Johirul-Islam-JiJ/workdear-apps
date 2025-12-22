import { Job } from "./Job";
import { JobSubmissionImage, MyWorkStatus } from "./myWork";

export type JobSubmission = {
  id: number;
  answer: string;
  created_at: string;
  deleted_at: null;
  job: Job;
  job_id: number;
  job_submission_image: JobSubmissionImage[];
  proof_data: string;
  rating: string;
  rejection_reason: null;
  report: null;
  reviewed_at: null;
  star_reason: null;
  status: MyWorkStatus;
  submitted_at: string;
  updated_at: string;
  worker_id: number;
};
