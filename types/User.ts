interface UserRating {
  job_posted_count: number;
  pending: number;
  pending_percentage: number;
  report_count: number;
  report_percentage: number;
  satisfied_count: number;
  satisfied_percentage: number;
  star_count: number;
  star_provider_count: number;
  star_rating: number;
  total_submissions: number;
  unsatisfied_count: number;
  unsatisfied_percentage: number;
}

interface UserTransactionRecord {
  advertisement_payment: string;
  created_at: string;
  credit_deposit_balance_by_system: string;
  credit_earning_balance_by_system: string;
  debit_deposit_balance_by_system: string;
  debit_earning_balance_by_system: string;
  deposit: string;
  deposit_fee_gateway: string;
  deposit_fee_manual: string;
  id: number;
  instant_verification_fee: string;
  job_earn: string;
  job_promotion: string;
  job_rejection_penalty: string;
  job_review_fee: string;
  job_tips_provider: string;
  job_tips_receiver: string;
  jop_post_fee: string;
  play_and_earn: string;
  premium_subscription: string;
  referral_bonus: string;
  referral_deposit_commission: string;
  referral_task_commission: string;
  ticket_draw_winner: string;
  ticket_purchase: string;
  updated_at: string;
  user_id: number;
  withdraw: string;
  withdrawal_fee_gateway: string;
  withdrawal_fee_manual: string;
}

interface Verification {
  card_number: string | null;
  created_at: string;
  deleted_at: string | null;
  front_image: string | null;
  full_name: string;
  id: number;
  id_type: string;
  phone_number: string | null;
  rejection_reason: string | null;
  reviewed_at: string;
  selfie_image: string | null;
  status: string;
  submitted_at: string;
  updated_at: string;
  user_id: string;
}

interface WalletBalance {
  currency: string;
  deposit_balance: string;
  earning_balance: string;
  total_balance: number;
}

export interface User {
  about_me: string | null;
  active: string;
  age: string | null;
  country: string | null;
  country_id: string | null;
  created_at: string;
  deactivation: string | null;
  deleted_at: string | null;
  email: string;
  email_verified_at: string | null;
  id: number;
  is_premium: boolean;
  is_verified: boolean;
  last_seen: string;
  manager_id: string | null;
  name: string;
  online_status: boolean;
  phone_number: string | null;
  premium_subscriptions: [];
  profile_image: string;
  referral_code: string;
  referral_paused: string;
  security_code: string | null;
  updated_at: string;
  user_rating: UserRating;
  user_transaction_record: UserTransactionRecord;
  username: string;
  verification: Verification;
  verificationStatus: string;
  verification_type: string;
  wallet_balance: WalletBalance;
}

export interface AffiliateProgram {
  activation_bonus: number;
  program_description: string;
  status: boolean;
  total: number;
}
