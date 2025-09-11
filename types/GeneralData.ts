/**
 * Represents a single advertisement.
 */
export interface Advertisement {
  banner_image: string;
  cost: string;
  created_at: string;
  deleted_at: string | null;
  duration_days: string;
  end_date: string;
  id: number;
  start_date: string;
  status: string;
  target_url: string;
  title: string;
  updated_at: string;
  user_id: number;
}

/**
 * Represents the color palette configuration.
 */
export interface ColorPalette {
  id: number;
  name: string;
  pallette_1_dark: string;
  pallette_1_light: string;
  pallette_2_dark: string;
  pallette_2_light: string;
  pallette_3_dark: string;
  pallette_3_light: string;
  pallette_4_dark: string;
  pallette_4_light: string;
  pallette_5_dark: string;
  pallette_5_light: string;
  pallette_6_dark: string;
  pallette_6_light: string;
}

/**
 * Represents phone number details for site contact.
 */
export interface SitePhone {
  cell: string;
  telegram: string;
  whatsapp: string;
}

/**
 * Represents social media links for the site.
 */
export interface SocialLinks {
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}

/**
 * Represents the overall application configuration data.
 */
export interface AppConfig {
  active_color_palette: string;
  advertisements: Advertisement[];
  color_palette: ColorPalette;
  deposit_max_amount: string;
  deposit_min_amount: string;
  dollar_rate: string;
  job_estimated_days: string;
  job_maximum_estimated_day: string;
  job_minimum_estimated_day: string;
  job_minimum_worker: string;
  job_required_screenshot_limit: string;
  jobs_count: number;
  mail_encryption: string;
  mail_from_address: string;
  mail_from_name: string;
  mail_host: string;
  mail_mailer: string;
  mail_password: string;
  mail_port: string;
  mail_username: string;
  referral_enabled: boolean;
  referral_program_description: string;
  site_address: string;
  site_description: string;
  site_email: string;
  site_favicon: string;
  site_logo_dark: string;
  site_logo_light: string;
  site_maintenance_message: string;
  site_maintenance_mode: number;
  site_name: string;
  site_phone: SitePhone;
  social_links: SocialLinks;
  task_count: number;
  total_payment: number;
  user_count: number;
  withdraw_max_amount: string;
  withdraw_min_amount: string;
}
