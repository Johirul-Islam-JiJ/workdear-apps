import {
  PaymentMethod,
  PaymentMethodForm,
  PaymentMethodsType,
} from "@/types/payment";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
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
  onSubmit: (data: any) => void;
  isLoading: boolean;
};

const PaymentForm = ({
  paymentMethod,
  formType,
  currency,
  conversionRate,
  fee,
  onSubmit,
  isLoading,
}: props) => {
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
                        border={true}
                        error={error?.message}
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

      <ThemedText
        variant="small"
        style={{ marginTop: 10, textTransform: "capitalize" }}
      >
        {formType} amount:{" "}
        <ThemedText color="warning" variant="small">
          {(
            equivalentUSD -
            (equivalentUSD * networkFee) / 100 -
            (equivalentUSD * fee) / 100
          ).toFixed(4)}
          $
        </ThemedText>
      </ThemedText>
      <Button
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        title={formType === "deposit" ? "Deposit" : "Withdraw"}
      />
    </View>
  );
};

export default PaymentForm;
