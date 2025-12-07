import { PremiumPackage } from "@/types/PremiumPackage";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import AppIcon from "../libs/AppIcon";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  packageInfo: PremiumPackage;
};

const PakcageFeatureList = ({ packageInfo }: Props) => {
  return (
    <Card style={{ rowGap: 0 }}>
      <ThemedText variant="subtitle">Features</ThemedText>
      {packageInfo.feature.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
            gap: 6,
          }}
        >
          <AppIcon color="primarydarker">
            <FontAwesome name="check-square" />
          </AppIcon>
          <ThemedText>{item}</ThemedText>
        </View>
      ))}
    </Card>
  );
};

export default PakcageFeatureList;
