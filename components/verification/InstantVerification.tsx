import { useAppSelector } from "@/hooks/redux";
import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import useInstantVerification from "@/hooks/useInstantVerification";
import { CostName } from "@/types/CostCenter";
import React from "react";
import { View } from "react-native";
import Button from "../libs/Button";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";

const InstantVerification = () => {
  const { handleVerify, isLoading } = useInstantVerification();
  const { user } = useAppSelector((state) => state.user);
  const cost = useGetCostFromCostCenter(CostName.Instant_Verification_Fee);

  const verified = user?.verification?.status === "VERIFIED";
  const disabled =
    parseInt(user?.wallet_balance?.deposit_balance || "0") < cost || verified;
  return (
    <Card>
      <View>
        <ThemedText variant="subtitle">Instant account verify</ThemedText>
        <ThemedText variant="small" color="warning">
          It will automatically deduct ${cost} from your deposit amount
        </ThemedText>
      </View>
      <Button
        onPress={handleVerify}
        disabled={disabled}
        title={verified ? "Verified" : "Verify"}
        loading={isLoading}
      />
    </Card>
  );
};

export default InstantVerification;
