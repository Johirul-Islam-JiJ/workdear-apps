import { useToast } from "@/hooks/useToast";
import { useSaveSupportFileMutation } from "@/store/features/liveSupport";
import { ImagePickerAsset } from "expo-image-picker";

export const useUploadFile = () => {
  const [uploadFile] = useSaveSupportFileMutation();
  const toast = useToast();

  const handleUploadFile = async (file: ImagePickerAsset | any) => {
    try {
      const formData = new FormData();

      const extension = file.uri?.split(".").pop() || "jpg";
      const fileName = file.fileName || `upload_${Date.now()}.${extension}`;
      const fileType =
        file.mimeType ||
        file.type ||
        (extension === "m4a" ? "audio/m4a" : "image/jpeg");

      formData.append("file", {
        uri: file.uri,
        type: fileType,
        name: fileName,
      } as any);

      const res = await uploadFile(formData).unwrap();
      return res.fileUrl;
    } catch (error: any) {
      toast.error(error?.data?.message || "Internal server error");
    }
  };

  return { handleUploadFile };
};
