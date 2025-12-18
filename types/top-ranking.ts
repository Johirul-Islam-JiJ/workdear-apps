export interface TopWorker {
  id: number;
  user_name: string;
  user_rating: number;
  total_submissions: number;
}

export interface TopJobPoster {
  id: number;
  user_name: string;
  job_posted_count: number;
}

export interface TopRefferer {
  id: number;
  user_name: string;
  referral_count: number;
}

export interface TopUser {
  id: number;
  user_name: string;
  total_earnings: number;
}
