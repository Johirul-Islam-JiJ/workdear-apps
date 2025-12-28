import { countryCurrency } from "@/_mock/payment";

export enum PaymentMethodsType {
  apay = "apay",
  passimpay = "passimpay",
}

export enum PaymentSystemsType {
  deposit = "deposit",
  withdrawal = "withdrawal",
}

export type PaymentMethodForm = {
  name: string;
  form_fields: {
    key: string;
    label: string;
    type: string;
    placeholder: string;
    options: { value: string; label: string }[];
    validation: {
      required: string;
      minLength: { value: string; message: string };
      maxLength: { value: string; message: string };
      pattern: { value: string; message: string };
    };
  }[];
};

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
  gateway_id: number;
};

export type ExchangeRate = {
  id: number;
  from_currency: keyof typeof countryCurrency;
  to_currency: keyof typeof countryCurrency;
  rate: string;
  created_at: string;
  updated_at: string;
};

export enum PaymentStatusType {
  pending = "Pending",
  completed = "Success",
  failed = "Failed",
}

export type PaymentInfo = {
  transaction_report: {
    amount: string;
    created_at: string;
    currency: string;
    deposit_fee: number;
    deposit_in_wallet: number;
    order_id: string;
    payment_system: string;
    redirect_url: null;
    status: PaymentStatusType;
    transaction_id: string;
  };
  user: {
    deposit_balance: string;
    earning_balance: string;
    deposit_in_wallet: string;
    email: string;
    id: number;
    name: string;
  };
};

export type TransactionHistory = {
  amount: string;
  created_at: string;
  currency: string;
  id: number;
  payment_system: string;
  processed_by: string;
  status: PaymentStatusType;
  transaction_id: string;
  type: PaymentMethodsType;
};
