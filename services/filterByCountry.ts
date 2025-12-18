import { PaymentMethod, PaymentSystemsType } from "@/types/payment";

type Params = {
  data: PaymentMethod[];
  currency: string;
  type: PaymentSystemsType;
  crypto: boolean;
};

export function filterByCountry({ data, type, crypto, currency }: Params) {
  const dev = false;
  if (!Array.isArray(data)) return [];

  if (dev) return data.filter((item) => item?.[type]);

  if (crypto) {
    return data.filter((item) => item.type === "passimpay" && item?.[type]);
  }

  return data.filter((item) => {
    if (item.type === "apay") {
      return item?.currency === currency && item?.[type];
    } else {
      return false;
    }
  });
}
