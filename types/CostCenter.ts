export enum CostName {
  BOOST = "BOOST",
  PIN = "PIN",
  Job_Submission_Unsatisfied = "Job_Submission_Unsatisfied",
  Instant_Verification_Fee = "Instant_Verification_Fee",
  referral_activation_bonus = "referral_activation_bonus",
  referrer_first_deposit_commission_percentage = "referrer_first_deposit_commission_percentage",
  referrer_first_signup_commission = "referrer_first_signup_commission",
  referrer_job_completion_commission_percentage = "referrer_job_completion_commission_percentage",
  withdrawal_fee_manual_percentage = "withdrawal_fee_manual_percentage",
  withdrawal_fee_gateway_percentage = "withdrawal_fee_gateway_percentage",
  deposit_fee_manual_percentage = "deposit_fee_manual_percentage",
  deposit_fee_gateway_percentage = "deposit_fee_gateway_percentage",
  job_review_fee_per_job = "job_review_fee_per_job",
  job_post_fee_percentage = "job_post_fee_percentage",
  dollar_rate = "dollar_rate",
  job_post_screenshot_fee = "job_post_screenshot_fee",
}

export interface CostCenter {
  cost: number;
  created_at: string;
  id: number;
  name: CostName;
  updated_at: string;
}
