import { countryCurrency } from "@/_mock/payment";

export enum PaymentMethodsType {
  apay = "apay",
  passimpay = "passimpay",
}

export enum PaymentSystemsType {
  deposit = "deposit",
  withdrawal = "withdrawal",
}

// const l = {
//   country: null,
//   created_at: "2025-09-23T05:10:34.000000Z",
//   currency: "BDT",
//   deposit: true,
//   deposit_backend_data:
//     '{  "bkash_b": {    "fields": ["account_number", "return_url"],    "rules": {      "account_number": "required|string|regex:/^01[0-9]{9}$/",      "return_url": "required|string"    }  }}',
//   deposit_frontend_data:
//     '{"name":"bkash_b","form_fields":[{"key":"account_number","label":"Your account number","type":"number","placeholder":"Enter your account number","options":[{"value":"","label":""}],"validation":{"required":"Account number is required","minLength":{"value":"11","message":"Minimum length 11"},"maxLength":{"value":"11","message":"Maximum length 11"},"pattern":{"value":"","message":""}}}]}',
//   description: null,
//   id: 1,
//   image_url: "uploads/images/gateways/fac7c08e-f60b-4664-8bc8-3334057b7ec3.png",
//   is_active: true,
//   max_deposit: "25000.00",
//   max_withdrawals: "25000.00",
//   min_deposit: "300.00",
//   min_withdrawals: "200.00",
//   name: "bkash_b",
//   slug: "apay_bkash_b",
//   supported_country_id: null,
//   type: "apay",
//   updated_at: "2025-11-11T06:54:23.000000Z",
//   withdrawal: true,
//   withdrawal_backend_data:
//     '{  "bkash_b": {    "fields": ["account_number", "account_email"],    "rules": {      "account_number": "required|string|min:11|max:11|regex:/^(01[3-9]\\\\d{8})$/",      "account_email": "required|string|max:100|regex:/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\\\.[A-Za-z]{2,}$/"    }  }}',
//   withdrawal_frontend_data:
//     '{"name":"bkash_b","form_fields":[{"key":"account_number","label":"Bkash account number","type":"number","placeholder":"Enter your Bkash number","options":[{"value":"","label":""}],"validation":{"required":"Account number is required","minLength":{"value":"11","message":"Minimum 11 numbers"},"maxLength":{"value":"11","message":"Maximum 11 numbers"},"pattern":{"value":"/^(01[3-9]\\\\d{8})$/","message":"Invalid Nagad number"}}},{"key":"account_email","label":"Your email address","type":"email","placeholder":"Enter your email address","options":[{"value":"","label":""}],"validation":{"required":"Email address is required","minLength":{"value":"","message":""},"maxLength":{"value":"100","message":"Maximum 100 characters"},"pattern":{"value":"/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/","message":"Invalid email address"}}}]}',
// };

export type PaymentMethod = {
  id: number;
  name: string;
  slug: string;
  type: string;
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
};
