import { useAppSelector } from "@/hooks/redux";
import { useToast } from "@/hooks/useToast";
import { useReferrelPauseMutation } from "@/store/features/auth";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, ViewStyle } from "react-native";
import AppIcon from "../libs/AppIcon";
import Button from "../libs/Button";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";

const AffiliateProgramControl = () => {
  const { user } = useAppSelector((state) => state.user);
  const [pauseReferrel, { isLoading }] = useReferrelPauseMutation();

  const toast = useToast();

  async function handlePause() {
    try {
      await pauseReferrel(undefined).unwrap();
      toast.success("Referral status updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Internal Server Error");
    }
  }

  const isPaused = parseInt(user?.referral_paused as string) === 1;

  const headerWrapper: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };
  return (
    <Card>
      <View style={headerWrapper}>
        <ThemedText variant="body2">Affiliate Program</ThemedText>
        <Button
          title={isPaused ? "Activate" : "Deactivate"}
          color={isPaused ? "success" : "warning"}
          startIcon={
            <AppIcon size={18} color="white">
              <MaterialIcons
                name={
                  isPaused ? "airplanemode-active" : "airplanemode-inactive"
                }
              />
            </AppIcon>
          }
          onPress={handlePause}
          loading={isLoading}
          size="small"
        />
      </View>
      <View>
        <ThemedText
          style={{ fontWeight: "bold" }}
          color={isPaused ? "warning" : "success"}
        >
          Your affiliate link is {isPaused ? "Paused" : "Active"}!
        </ThemedText>
        <ThemedText>
          Post your affiliate link on blogs, websites, forums, social media, or
          write a Workdear review. Refer new members (Freelancers & Business
          Owners) and earn commission revenue!
        </ThemedText>
      </View>
    </Card>
  );
};

export default AffiliateProgramControl;
