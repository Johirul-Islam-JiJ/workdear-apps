export type MyJob = {
  id: number;
  job_code: string;
  title: string;
  description: string;
  tag_line: string;
  pay_per_task: string;
  total_workers_required: number;
  estimated_day: string;
  start_date: string;
  end_date: string;
  status: string;
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
