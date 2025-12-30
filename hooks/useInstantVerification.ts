import {
  useInstansVerificationMutation,
  useUpdateVerificationTypeMutation,
} from "@/store/features/verifications";
import { Alert } from "react-native";
import { useToast } from "./useToast";

export default function useInstantVerification() {
  const [instanVerify, { isLoading }] = useInstansVerificationMutation();
  const [changeVerificationType, { isLoading: isUpdating }] =
    useUpdateVerificationTypeMutation();

  const toast = useToast();

  const handleVerify = async () => {
    Alert.alert(
      "Confirm Verification",
      "Are you sure you want to proceed with instant verification?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: async () => {
            try {
              await changeVerificationType({ verification_type: "INSTANT" });
              await instanVerify(undefined).unwrap();
              toast.success("Successfully verified");
            } catch (error: any) {
              toast.error(error?.data?.message || "Verification failed");
            }
          },
        },
      ]
    );
  };

  return {
    handleVerify,
    isLoading: isLoading || isUpdating,
  };
}
