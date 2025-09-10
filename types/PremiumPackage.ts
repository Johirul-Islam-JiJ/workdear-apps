export type PremiumPackage = {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
  feature: string[];
  highlighted: boolean;
  created_at: string;
  updated_at: string;
};

export interface PremiumPackages {
  subscription_package_list: PremiumPackage[];
}
