import * as yup from "yup";

export const Advertisementschema = yup.object({
  title: yup.string().required("Title is required"),
  target_url: yup
    .string()
    .required("Link is required")
    .test("url", "Invalid URL", (value) => {
      if (!value) return false;
      try {
        new URL(value);
        return true;
      } catch (error) {
        return false;
      }
    }),
  status: yup.string().required("Status is required"),
  cost_id: yup.string().required("Time duration is required"),
  banner_image: yup
    .mixed()
    .required("Banner image is required")
    .test(
      "fileType",
      "Banner Image must be in jpg, jpeg, or png format",
      (value: any) => {
        if (!value) return false;
        if (typeof value === "string") return true;
        return (
          value.mimeType === "image/jpeg" ||
          value.mimeType === "image/png" ||
          value.mimeType === "image/jpg"
        );
      }
    )
    .test(
      "fileSize",
      "Banner Image size must be less than 2MB",
      (value: any) => {
        if (!value) return false;
        if (typeof value === "string") return true;
        return value.fileSize <= 2 * 1024 * 1024;
      }
    ),
});
