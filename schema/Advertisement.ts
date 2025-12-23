import * as yup from "yup";

export const Advertisementschema = yup.object({
  title: yup.string().required("Title is required"),
  target_url: yup.string().required("Link is required"),
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
        return value.fileSize <= 1 * 1024 * 1024;
      }
    ),
});
