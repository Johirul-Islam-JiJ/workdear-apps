import { useToast } from "@/hooks/useToast";
import { useSaveSupportFileMutation } from "@/store/features/liveSupport";
import { ImagePickerAsset } from "expo-image-picker";

export const useUploadFile = () => {
  const [uploadFile] = useSaveSupportFileMutation();
  const toast = useToast();

  const handleUploadFile = async (file: ImagePickerAsset | any) => {
    try {
      const formData = new FormData();
      const fileName = file.fileName || `upload_${Date.now()}`;
      formData.append(
        "file",
        { uri: file.uri, type: file.type, name: fileName } as any,
        fileName
      );
      const res = await uploadFile(formData).unwrap();
      return res.fileUrl;
    } catch (error: any) {
      toast.error(error?.data?.message || "Internal server error");
    }
  };

  return { handleUploadFile };
};
