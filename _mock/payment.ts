export const paymentType = {
  bank_transfer: "bank_transfer",
  crypto_transfer: "crypto_wallet",
  mobile_deposit: "mobile_banking",
};

export const paymentMethods = [
  {
    image: "/bank.png",
    title: "Bank Transfer",
    method: paymentType.bank_transfer,
    withdraw: true,
  },

  {
    image: "/coin.png",
    title: "Crypto Transfer",
    method: paymentType.crypto_transfer,
    withdraw: true,
  },
  {
    image: "/mobile-banking.png",
    title: "Mobile Banking",
    method: paymentType.mobile_deposit,
    withdraw: true,
  },
];

export const countryCurrency = {
  IN: "INR",
  PK: "PKR",
  NP: "NPR",
  BD: "BDT",
};
export const countryCurrencyPattern = /INR|PKR|NPR|BDT/;
