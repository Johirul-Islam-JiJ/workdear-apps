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

export const EditProfileSchema = yup.object().shape({
  name: yup.string(),
  age: yup.string().matches(/^\d*$/, "Age must be a number"),
  email: yup.string().email("Invalid email"),
  phone: yup.string(),
  country: yup.string(),
  about_me: yup.string(),
});

export const ResetPasswordSchema = yup.object().shape({
  old_password: yup.string().required(" Old password is required"),
  password: yup.string().required("New password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});

export const ForgetPasswordSchema = yup.object().shape({
  token: yup.string().required("OTP is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one uppercase, one lowercase, one number, and one special character"
    ),
  password_confirmation: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: yup.boolean(),
  device_name: yup.string(),
});

export const RegisterSchema = yup.object().shape({
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
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
  country_id: yup.string().required("Country is required"),
  manager_id: yup.string(),
  acceptedTerms: yup
    .boolean()
    .oneOf([true], "You must accept the Terms and Privacy Policy"),
});

export const AccountVerificationSchema = yup.object().shape({
  verifyType: yup
    .string()
    .required("Verification type is required")
    .default(""),
  fullName: yup.string().required("Full Name is required"),
  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^\d+$/, "Card number must contain only digits"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(11, "Phone number must be at least 11 digits"),
  frontImage: yup
    .mixed()
    .required("Front image is required")
    .test(
      "fileType",
      "Front image must be in jpg,jpeg or png format",
      (value: any) => {
        if (!value) return false;
        if (value) {
          return (
            value.mimeType === "image/jpeg" ||
            value.mimeType === "image/png" ||
            value.mimeType === "image/jpg"
          );
        }
      }
    )
    .test(
      "fileSize",
      "Front image must be less than 2048KB",
      (value: any) => value && value.fileSize <= 2048 * 1024
    ),
  selfieImage: yup
    .mixed()
    .required("Selfie image is required")
    .test(
      "fileType",
      "Selfie image must be in jpg,jpeg or png format",
      (value: any) => {
        if (!value) return false;
        if (value) {
          return (
            value.mimeType === "image/jpeg" ||
            value.mimeType === "image/png" ||
            value.mimeType === "image/jpg"
          );
        }
      }
    )
    .test(
      "fileSize",
      "Selfie image must be less than 2048KB",
      (value: any) => value && value.fileSize <= 2048 * 1024
    ),
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
