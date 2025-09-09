import { ImagePickerAsset } from "expo-image-picker";
import * as yup from "yup";

export const firstFormSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  thumbnail: yup
    .mixed<ImagePickerAsset>()
    .test(
      "fileType",
      "Thumbnail must be in jpg,jpeg or png format",
      (value) => {
        if (value) {
          return (
            value.mimeType === "image/jpeg" ||
            value.mimeType === "image/png" ||
            value.mimeType === "image/jpg"
          );
        }
        return true;
      }
    )
    .test("fileSize", "Thumbnail size must be less than 2MB", (value) => {
      if (value?.fileSize) {
        return value.fileSize <= 2 * 1024 * 1024;
      }
      return true;
    })
    .required("Thumbnail is required"),

  steps: yup.array(
    yup.object({
      step_number: yup.number().required("Step number is required"),
      instruction: yup.string().required("Step instruction is required"),
    })
  ),

  required_proofs: yup.array(
    yup
      .object({
        type: yup.string().nullable(),
        description: yup.string().nullable(),
      })
      .test("type-description-required", function (value) {
        if (!value) return true;
        const { type, description } = value;

        if (!type && !description) return true; // both empty
        if (type && description) return true; // both filled

        if (!type && description) {
          return this.createError({
            path: `${this.path}.type`,
            message: "Proof type is required",
          });
        }

        if (type && !description) {
          return this.createError({
            path: `${this.path}.description`,
            message: "Proof description is required",
          });
        }

        return true;
      })
  ),

  question_condition: yup.array(
    yup
      .object({
        id: yup.number().nullable(),
        answer_type: yup.string().nullable(),
        text: yup.string().nullable(),
        condition: yup.object({
          operator: yup.string().nullable(),
          value: yup.string().nullable(),
        }),
      })
      .test("all-or-nothing", function (fields) {
        if (!fields) return true;

        const { answer_type, text, condition } = fields;
        const operator = condition?.operator;
        const value = condition?.value;

        if (!answer_type && !text && !operator && !value) return true;
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

export type FistFormData = yup.InferType<typeof firstFormSchema>;
