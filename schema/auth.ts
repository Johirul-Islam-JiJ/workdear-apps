import * as yup from "yup";

export const SignUpSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Minimum 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  password_confirmation: yup
    .string()
    .required("Re-enter password is required")
    .min(6, "Password must be at least 6 characters"),
  country_id: yup.string().required("Country is required"),
  manager_id: yup.string(),
  acceptedTerms: yup
    .boolean()
    .oneOf([true], "You must accept the Terms and Privacy Policy")
    .required(),
});

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  country_id: "",
  manager_id: "",
  acceptedTerms: false,
};

export const loginDefaultValues = {
  email: "",
  password: "",
};
