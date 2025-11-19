import { countryCurrency } from "@/_mock/payment";

export enum PaymentMethodsType {
  apay = "apay",
  passimpay = "passimpay",
}

export enum PaymentSystemsType {
  deposit = "deposit",
  withdrawal = "withdrawal",
}

export type PaymentMethod = {
  id: number;
  name: string;
  slug: string;
  fee_network: string | null;
  active: boolean;
  description: string | null;
  type: PaymentMethodsType;
  image_url: string;
  deposit: boolean;
  withdrawal: boolean;
  deposit_backend_data: string;
  withdrawal_backend_data: string;
  deposit_frontend_data: string;
  withdrawal_frontend_data: string;
  min_deposit: string;
  max_deposit: string;
  min_withdrawals: string;
  max_withdrawals: string;
  created_at: string;
  updated_at: string;
  currency: keyof typeof countryCurrency;
  network?: string;
  rate_usd?: string;
};

export type ExchangeRate = {
  id: number;
  from_currency: keyof typeof countryCurrency;
  to_currency: keyof typeof countryCurrency;
  rate: string;
  created_at: string;
  updated_at: string;
};
