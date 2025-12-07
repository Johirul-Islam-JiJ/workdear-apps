import { useToast } from "@/hooks/useToast";
import { useBuyPremiumMutation } from "@/store/features/premium";
import { PremiumPackage } from "@/types/PremiumPackage";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View, ViewStyle } from "react-native";
import Button from "../libs/Button";
import Card from "../libs/Card";
import { DropdownMenu } from "../libs/DropdownMenu";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  packageInfo: PremiumPackage;
};

const PurchasePackCard = ({ packageInfo }: Props) => {
  const [buyPremium, { isLoading }] = useBuyPremiumMutation();
  const toast = useToast();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      paid_from: "",
      package_id: packageInfo.id,
    },
  });

  const handleConfirmPurchase = async (payload: any) => {
    try {
      await buyPremium(payload).unwrap();
      toast.success("Premium subscription purchased successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || err.message || "Internal Server Error");
    }
  };

  const options = [
    { value: "earning_balance", label: "Earning Balance" },
    { value: "deposit_balance", label: "Deposit Balance" },
  ];

  const itemStyle: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <Card>
      <View>
        <ThemedText variant="subtitle">Purchase premium package</ThemedText>
        <ThemedText color="gray.400">
          {packageInfo.description} {packageInfo.highlighted && "(Popular)"}
        </ThemedText>
      </View>

      <View>
        <View style={itemStyle}>
          <ThemedText>Duration: </ThemedText>
          <ThemedText variant="bodySemiBold">
            {packageInfo.duration} months
          </ThemedText>
        </View>
        <View style={itemStyle}>
          <ThemedText>Amount: </ThemedText>
          <ThemedText variant="bodySemiBold">${packageInfo.price}</ThemedText>
        </View>
      </View>

      <View>
        <ThemedText>Choose balance type</ThemedText>
        <Controller
          control={control}
          name="paid_from"
          rules={{ required: "Balance type is required" }}
          render={({ field }) => (
            <DropdownMenu
              items={options}
              placeholder="Balance type"
              border
              onSelect={field.onChange}
              error={errors.paid_from?.message}
            />
          )}
        />
      </View>
      <Button
        loading={isLoading}
        onPress={handleSubmit(handleConfirmPurchase)}
        startIcon="rocket"
        title="Purchase"
        style={{ marginTop: 10 }}
      />
    </Card>
  );
};

export default PurchasePackCard;
