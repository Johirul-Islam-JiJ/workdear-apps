import { useAppDispatch } from "@/hooks/redux";
import { showNotification } from "@/store/slices/notification";

export const useToast = () => {
  const dispatch = useAppDispatch();

  const success = (message: string) => {
    dispatch(
      showNotification({
        message,
        type: "success",
      })
    );
  };

  const error = (message: string) => {
    dispatch(
      showNotification({
        message,
        type: "error",
      })
    );
  };

  return { success, error };
};
