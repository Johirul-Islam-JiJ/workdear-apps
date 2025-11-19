import {
  useGetSingleDepositPaymentSystemQuery,
  useGetSinglePassimpayGatewayQuery,
} from "@/store/features/payment";
import { PaymentMethod, PaymentMethodsType } from "@/types/payment";

type params = {
  id: number;
  type: PaymentMethodsType | null;
};
type data = {
  data: PaymentMethod;
  isLoading: boolean;
};

const useGetSingleGateWay = ({ id, type }: params): data => {
  const { data: apayGateway, isLoading: apayLoading } =
    useGetSingleDepositPaymentSystemQuery(id, {
      skip: !id || type === "passimpay",
    });
  const { data: passimpayGateway, isLoading: passimpayLoading } =
    useGetSinglePassimpayGatewayQuery(id, {
      skip: !id || type === "apay",
    });

  return {
    data: type === "apay" ? apayGateway?.data : passimpayGateway?.data,
    isLoading: apayLoading || passimpayLoading,
  };
};

export default useGetSingleGateWay;
