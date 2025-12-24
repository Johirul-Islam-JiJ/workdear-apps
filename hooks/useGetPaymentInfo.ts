import {
  useGetPassimpayPaymentInfoQuery,
  useGetPaymentInfoQuery,
} from "@/store/features/payment";
import { PaymentInfo } from "@/types/payment";
import { useAppSelector } from "./redux";

type params = {
  token?: string;
  orderId: string;
  type: string;
};
type data = {
  data: PaymentInfo;
  isLoading: boolean;
};

const useGetPaymentInfo = ({ token, orderId, type }: params): data => {
  const { token: authToken } = useAppSelector((state) => state.user);
  const { data: apayPaymentInfo, isLoading: apayLoading } =
    useGetPaymentInfoQuery(token, {
      skip: !token || !authToken || type === "passimpay",
    });
  const { data: passimpayPaymentInfo, isLoading: passimpayLoading } =
    useGetPassimpayPaymentInfoQuery(orderId, {
      skip: !orderId || !authToken || type === "apay",
    });

  return {
    data: type === "apay" ? apayPaymentInfo : passimpayPaymentInfo,
    isLoading: apayLoading || passimpayLoading,
  };
};

export default useGetPaymentInfo;
