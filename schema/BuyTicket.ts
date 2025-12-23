import * as yup from "yup";

export const BuyTicketSchema = yup.object({
  ticket_amount: yup
    .string()
    .required("Ticket amount is required")
    .test(
      "is-positive-integer",
      "Ticket amount must be a positive number",
      (value) => {
        if (!value) return false;
        const num = Number(value);
        return Number.isInteger(num) && num > 0;
      }
    ),
  balance_type: yup.string().required("Please select a balance type"),
});
