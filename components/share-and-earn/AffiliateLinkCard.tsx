import { config } from "@/config/config";
import { useAppSelector } from "@/hooks/redux";
import { useToast } from "@/hooks/useToast";
import { useReferredDataQuery } from "@/store/features/auth";
import { AffiliateProgram } from "@/types/User";
import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import { View } from "react-native";
import AppIcon from "../libs/AppIcon";
import Card from "../libs/Card";
import IconButton from "../libs/IconButton";
import Input from "../libs/Input";
import LoadingIndicator from "../libs/LoadingIndicator";
import { ThemedText } from "../libs/ThemedText";

const AffiliateLinkCard = () => {
  const [copied, setCopied] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const affiliateLink = `${config.siteUrl}/signup/?ref=${user?.id}&type=affiliate&referral_code=${user?.referral_code}`;
  const { data, isLoading } = useReferredDataQuery(undefined);
  const toast = useToast();

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(affiliateLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Affiliate link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy affiliate link.");
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const affiliateData: AffiliateProgram = data?.data || {};

  return (
    <Card>
      <ThemedText variant="body2">Your Affiliate link</ThemedText>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View style={{ width: "90%" }}>
          <Input value={affiliateLink} />
        </View>
        <IconButton
          onPress={handleCopy}
          color="primarydark"
          size="sm"
          icon={
            <AppIcon color="primarydark" size={20}>
              <Feather name={copied ? "check" : "copy"} />
            </AppIcon>
          }
        />
      </View>

      <View>
        <ThemedText style={{ fontWeight: "bold" }}>
          {affiliateData.total} user joined by your referral link.
        </ThemedText>
        <ThemedText>
          If your referral activates their account, you will get an instant $
          {affiliateData.activation_bonus} bonus in your earning balance.{" "}
          {affiliateData.program_description}
        </ThemedText>
      </View>
    </Card>
  );
};

export default AffiliateLinkCard;
