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
