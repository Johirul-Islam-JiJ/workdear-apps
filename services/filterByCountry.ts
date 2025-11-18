import { countryCurrency } from "@/_mock/payment";
import { PaymentMethod, PaymentSystemsType } from "@/types/payment";

export function filterByCountry(
  data: PaymentMethod[],
  country: keyof typeof countryCurrency = "BD",
  type: PaymentSystemsType,
  crypto: boolean
) {
  const dev = false;
  if (!Array.isArray(data)) return [];

  if (dev) return data.filter((item) => item?.[type]);

  if (crypto) {
    return data.filter((item) => item.type === "passimpay" && item?.[type]);
  }

  return data.filter((item: PaymentMethod) => {
    if (/INR|PKR|NPR|BDT/.test(item.currency)) {
      return item?.currency === countryCurrency[country] && item?.[type];
    } else {
      return false;
    }
  });
}
