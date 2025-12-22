import { Job } from "./Job";
import { TaskStatus } from "./myJobs";
import { JobSubmissionImage } from "./myWork";

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
  status: TaskStatus;
  submitted_at: string;
  updated_at: string;
  worker_id: number;
};
