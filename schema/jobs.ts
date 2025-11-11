import { AppConfig } from "@/types/GeneralData";
import { JobPostForm } from "@/types/Job";
import * as yup from "yup";

export const JobBasicDetailsSchema = yup.object({
  title: yup
    .string()
    .min(5, "Minimum 5 characters")
    .max(30, "Maximum 30 characters")
    .required("Title is required"),
  description: yup
    .string()
    .min(5, "Minimum 5 characters")
    .max(30, "Maximum 30 characters")
    .required("Short Title is required"),
  thumbnail: yup
    .mixed()
    .required("Thumbnail is required")
    .test(
      "fileType",
      "Thumbnail must be in jpg,jpeg or png format",
      (value: any) => {
        if (value) {
          if (typeof value === "string") return true;
          return (
            value.mimeType === "image/jpeg" ||
            value.mimeType === "image/png" ||
            value.mimeType === "image/jpg"
          );
        }
        return true;
      }
    )
    .test("fileSize", "Thumbnail size must be less than 10MB", (value: any) => {
      if (value) {
        if (typeof value === "string") return true;
        return value.fileSize <= 10 * 1024 * 1024;
      }
      return true;
    }),
  steps: yup.array().of(
    yup.object().shape({
      step_number: yup.number().required("Step number is required"),
      instruction: yup
        .string()
        .min(5, "Minimum 5 characters")
        .max(150, "Maximum 150 characters")
        .required("Step instruction is required"),
    })
  ),
  required_proofs: yup
    .array()
    .of(
      yup.object().shape({
        type: yup.string().required("Proof type is required"),
        description: yup.string().required("Proof description is required"),
      })
    )
    .min(1, "At least one proof is required"),

  question_condition: yup.array().of(
    yup
      .object()
      .shape({
        id: yup.number().nullable(),
        answer_type: yup.string().nullable(),
        text: yup.string().nullable(),
        condition: yup.object().shape({
          operator: yup.string().nullable(),
          value: yup.string().nullable(),
        }),
      })
      .test("all-or-nothing", {}, function (fields) {
        if (!fields) return true;

        const { answer_type, text, condition } = fields;
        const operator = condition?.operator;
        const value = condition?.value;

        // ✅ Case 1: all empty → allowed
        if (!answer_type && !text && !operator && !value) return true;

        // ✅ Case 2: all filled → allowed
        if (answer_type && text && operator && value) return true;

        if (!answer_type) {
          return this.createError({
            path: `${this.path}.answer_type`,
            message: "Answer type is required",
          });
        }
        if (!text) {
          return this.createError({
            path: `${this.path}.text`,
            message: "Question is required",
          });
        }
        if (!operator) {
          return this.createError({
            path: `${this.path}.condition.operator`,
            message: "Operator is required",
          });
        }
        if (!value) {
          return this.createError({
            path: `${this.path}.condition.value`,
            message: "Value is required",
          });
        }

        return true;
      })
  ),
});

export const JobEstimationSchema = (
  generalData: AppConfig,
  jobPostFinalForm: JobPostForm["jobPostFinalForm"]
) => {
  return yup.object({
    total_workers_required: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .min(
        parseInt(generalData?.job_minimum_worker),
        `minimum worker need ${generalData?.job_minimum_worker}`
      )
      .required("Worker is required"),
    pay_per_task: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .min(
        parseFloat(jobPostFinalForm.minimum_pay || "0"),
        `minimum ${jobPostFinalForm.minimum_pay} is required`
      )
      .required("Each worker earn is required"),
    require_screenshots: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .typeError("Required screenshot must be a number")
      .max(10, "Maximum 10 required screenshot is required")
      .required("Required screenshot is required"),
    estimated_day: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .min(
        parseInt(generalData?.job_minimum_estimated_day),
        `Minimum ${generalData?.job_minimum_estimated_day} day`
      )
      .required("Estimated day is required")
      .max(
        parseInt(generalData?.job_maximum_estimated_day),
        `Maximum ${generalData?.job_maximum_estimated_day} days`
      ),
    status: yup.string().trim().required("Status is required"),
  });
};

export const WorderExtendSchema = yup
  .object()
  .shape({
    worker_quantity: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .min(1, "Worker quantity must be at least 1")
      .integer("Worker quantity must be a whole number")
      .typeError("Worker quantity must be a number"),
    day_extend: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .min(1, "Day extend must be at least 1")
      .integer("Day extend must be a whole number")
      .typeError("Day extend must be a number"),
  })
  .test(
    "at-least-one-required",
    "At least one field is required",
    function (values) {
      const { worker_quantity, day_extend } = values;
      if (worker_quantity == null && day_extend == null) {
        return this.createError({
          path: "form_validation",
          message: "At least one field is required ",
        });
      }
      return true;
    }
  );
