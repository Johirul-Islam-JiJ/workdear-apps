import { config } from "@/config/config";
import { useToast } from "@/hooks/useToast";
import {
  useApayDepositMutation,
  useApayWithdrawMutation,
  useDepositWithPassimpayMutation,
  useWithdrawWithPassimpayMutation,
} from "@/store/features/payment";
import { PaymentMethod, PaymentSystemsType } from "@/types/payment";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import Card from "../libs/Card";
import PaymentDetails from "./PaymentDetails";
import PaymentMethods from "./PaymentMethods";
import PaymentMethodToggleButton from "./PaymentMethodToggleButton";

type Props = {
  fee: number;
  formType: "deposit" | "withdrawal";
  type: PaymentSystemsType;
  title: string;
};

const WalletContent = ({ fee, formType, type, title }: Props) => {
  const [passimpayWithdraw] = useWithdrawWithPassimpayMutation();
  const [passimpayDeposit] = useDepositWithPassimpayMutation();
  const [apayWithdraw] = useApayWithdrawMutation();
  const [apayDeposit] = useApayDepositMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [crypto, setCrypto] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<null | PaymentMethod>(
    null
  );

  async function handleApayDeposit(payload: any) {
    if (!paymentMethod) throw { message: "Please select a payment method" };
    payload.payment_system = paymentMethod.name;
    payload.data = payload.data || {};
    payload.data.return_url = config.paymentPageUrl;
    const res = await apayDeposit(payload).unwrap();
    if (res?.data?.gateway_url) {
      if (/^https?:\/\//.test(res.data?.gateway_url || "")) {
        // window.location.href = res.data.gateway_url;
      } else {
        // open payment app;
      }
    } else {
      throw { message: "Payment gateway URL not found" };
    }
  }

  async function handlePassimpayDeposit(payload: any) {
    if (!paymentMethod) throw { message: "Please select a payment method" };
    payload.currency_id = paymentMethod.gateway_id;
    const res = await passimpayDeposit(payload).unwrap();
    // open payment app;
  }

  async function handleApayWithdraw(payload: any) {
    if (!paymentMethod) throw { message: "Please select a payment method" };
    payload.payment_system = paymentMethod.name;
    payload.data = payload.data || {};
    await apayWithdraw(payload).unwrap();
  }

  async function handlePassimpayWithdraw(payload: any) {
    if (!paymentMethod) throw { message: "Please select a payment method" };
    payload.paymentId = paymentMethod.gateway_id;
    await passimpayWithdraw(payload).unwrap();
  }

  const onSubmit = async (payload: any) => {
    try {
      if (!paymentMethod) throw { message: "Please select a payment method" };
      setIsLoading(true);
      if (formType === "withdrawal") {
        if (paymentMethod.type === "apay") {
          await handleApayWithdraw(payload);
        } else if (paymentMethod.type === "passimpay") {
          await handlePassimpayWithdraw(payload);
        }
        toast.success("Withdrawal request sent successfully");
        router.push({
          pathname: "/(mainLayout)/(drawer)/transaction-history",
          params: { type: formType },
        });
      } else {
        if (paymentMethod.type === "apay") {
          await handleApayDeposit(payload);
        } else if (paymentMethod.type === "passimpay") {
          await handlePassimpayDeposit(payload);
        }
      }
    } catch (error: any) {
      const message =
        error?.data?.message || error?.message || "Internal server error";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <PaymentMethodToggleButton onChange={setCrypto} value={crypto} />
      <Card>
        {paymentMethod ? (
          <PaymentDetails
            setPaymentMethod={setPaymentMethod}
            paymentMethod={paymentMethod}
            formType={formType}
            fee={fee}
            onSubmit={onSubmit}
            isPaymentLoading={isLoading}
          />
        ) : (
          <PaymentMethods
            setPaymentMethod={setPaymentMethod}
            title={title}
            type={type}
            crypto={crypto}
          />
        )}
      </Card>
    </View>
  );
};

export default WalletContent;
