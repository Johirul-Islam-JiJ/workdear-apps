import {
  useApayWithdrawMutation,
  useWithdrawWithPassimpayMutation,
} from "@/store/features/payment";
import {
  PaymentMethod,
  PaymentMethodForm,
  PaymentMethodsType,
} from "@/types/payment";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import Button from "../libs/Button";
import { DropdownMenu } from "../libs/DropdownMenu";
import Input from "../libs/Input";
import { ThemedText } from "../libs/ThemedText";
type props = {
  paymentMethod: PaymentMethod;
  formType: "deposit" | "withdrawal";
  currency: string;
  conversionRate: string;
  fee: number;
};

const PaymentForm = ({
  paymentMethod,
  formType,
  currency,
  conversionRate,
  fee,
}: props) => {
  const [apayWithdraw, { isLoading: apayWithdrawLoading }] =
    useApayWithdrawMutation();
  const [passimpayWithdraw, { isLoading: passimpayWithdrawLoading }] =
    useWithdrawWithPassimpayMutation();
  const { handleSubmit, watch, control } = useForm();

  const minAmount =
    formType === "deposit"
      ? paymentMethod.min_deposit
      : paymentMethod.min_withdrawals;
  const maxAmount =
    formType === "deposit"
      ? paymentMethod.max_deposit
      : paymentMethod.max_withdrawals;

  const formData =
    formType === "deposit"
      ? paymentMethod.deposit_frontend_data
      : paymentMethod.withdrawal_frontend_data;

  const formFields: PaymentMethodForm = formData ? JSON.parse(formData) : {};
  const amount = watch("amount") || 0;
  const equivalentUSD: number =
    currency === "USD"
      ? amount
      : conversionRate
      ? (parseFloat(amount) / parseFloat(conversionRate)).toFixed(4)
      : 0;
  const networkFee: number = parseFloat(paymentMethod.fee_network ?? "0");

  async function handleApayWithdraw(payload: any) {
    payload.payment_system = paymentMethod.name;
    payload.data = payload.data || {};
    await apayWithdraw(payload).unwrap();
  }

  async function handlePassimpayWithdraw(payload: any) {
    payload.paymentId = paymentMethod.gateway_id;
    await passimpayWithdraw(payload).unwrap();
  }

  const onSubmit = async (payload: any) => {
    try {
      if (paymentMethod.type === "apay") {
        await handleApayWithdraw(payload);
      } else if (paymentMethod.type === "passimpay") {
        await handlePassimpayWithdraw(payload);
      }
      Alert.alert(
        "Success",
        "Withdraw request submitted successfully. You will be notified once it is processed."
      );
    } catch (error: any) {
      Alert.alert("Error", error.data?.message || "Internal Server Error");
    }
  };

  return (
    <View style={{ rowGap: 5, marginTop: 10 }}>
      <ThemedText
        style={{ textAlign: "center", fontWeight: "bold" }}
        color="primarydark"
      >
        Fill out the form
      </ThemedText>

      <View>
        <ThemedText>Amount ({currency})</ThemedText>
        <Controller
          control={control}
          name="amount"
          rules={{
            required: "Amount is required",
            min: {
              value: paymentMethod.min_deposit,
              message: `Minimum ${formType} amount is ${minAmount}`,
            },
            max: {
              value: paymentMethod.max_deposit,
              message: `Maximum ${formType} amount is ${maxAmount}`,
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              keyboardType="numeric"
              placeholder="Enter amount"
              error={error?.message}
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />

        {paymentMethod.type === PaymentMethodsType.apay && (
          <ThemedText variant="small">
            Equivalent amount:{" "}
            <ThemedText color="warning" variant="small">
              {equivalentUSD}$
            </ThemedText>
          </ThemedText>
        )}
      </View>

      {paymentMethod.type === PaymentMethodsType.passimpay && (
        <View>
          <ThemedText>Your Wallet ID</ThemedText>
          <Controller
            control={control}
            name="addressTo"
            rules={{ required: "Wallet ID is required" }}
            render={({ field, fieldState: { error } }) => (
              <Input
                placeholder="Enter your Wallet ID"
                value={field.value}
                onChangeText={field.onChange}
                error={error?.message}
              />
            )}
          />
        </View>
      )}

      {formFields.form_fields?.length > 0 &&
        formFields.form_fields.map((item) => {
          if (!item.key) return null;
          return (
            <View key={item.key}>
              <ThemedText>{item.label}</ThemedText>
              <Controller
                control={control}
                name={`data.${item.key}`}
                rules={item.validation as any}
                render={({ field, fieldState: { error } }) => {
                  if (item.type === "select") {
                    return (
                      <DropdownMenu
                        items={item.options}
                        placeholder={item.placeholder}
                        onSelect={field.onChange}
                        value={field.value}
                      />
                    );
                  }
                  return (
                    <Input
                      placeholder={item.placeholder}
                      error={error?.message}
                      value={field.value}
                      onChangeText={field.onChange}
                      keyboardType={
                        item.type === "number" ? "numeric" : "default"
                      }
                    />
                  );
                }}
              />
            </View>
          );
        })}

      <ThemedText variant="small" style={{ marginTop: 10 }}>
        Withdrawal amount:{" "}
        <ThemedText color="warning" variant="small">
          {equivalentUSD -
            (equivalentUSD * networkFee) / 100 -
            (equivalentUSD * fee) / 100}
          $
        </ThemedText>
      </ThemedText>
      <Button
        onPress={handleSubmit(onSubmit)}
        loading={apayWithdrawLoading || passimpayWithdrawLoading}
        title={formType === "deposit" ? "Deposit" : "Withdraw"}
      />
    </View>
  );
};

export default PaymentForm;
