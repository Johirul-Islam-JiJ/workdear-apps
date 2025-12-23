export enum AdvertisementStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  APPROVED = "APPROVED",
}

export interface Advertisement {
  abs_cost_id: string;
  banner_image: string;
  click_count: string;
  cost: string;
  created_date: string;
  created_at: string;
  deleted_at: string | null;
  duration_days: string;
  end_date: string;
  id: number;
  start_date: string;
  status: AdvertisementStatus;
  target_url: string;
  title: string;
  updated_at: string;
  user_id: number;
}

export interface AdvertisementSummary {
  active_ads: number;
  expired_ads: number;
  inactive_ads: number;
  pending_ads: number;
  total_ads: number;
  total_click: string;
  total_cost: string;
}
