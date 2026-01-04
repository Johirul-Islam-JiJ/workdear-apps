import { serviceIcons } from "@/_mock/services";
import { Feature } from "@/types/GeneralData";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { View, ViewStyle } from "react-native";
import { default as AppIcon } from "../libs/AppIcon";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

const ServiceCard = ({ item, index }: { item: Feature; index: number }) => {
  const iconStyle: ViewStyle = {
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <ThemedView color="card" style={{ borderRadius: 10, padding: 15 }}>
      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <ThemedView color="primarydark" style={iconStyle}>
          {serviceIcons[index].Icon({ color: "white", size: 30 })}
        </ThemedView>
      </View>
      <ThemedText variant="subtitle" style={{ textAlign: "center" }}>
        {item.title}
      </ThemedText>
      <ThemedText
        color="gray.700"
        darkColor="gray.300"
        style={{ textAlign: "center", marginTop: 5 }}
      >
        {item.description}
      </ThemedText>
      <View style={{ marginTop: 15, rowGap: 7, width: "90%" }}>
        {item.features.map((feature, index) => (
          <FeatureCard key={index} item={feature} />
        ))}
      </View>
    </ThemedView>
  );
};

function FeatureCard({ item }: { item: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
      }}
    >
      <AppIcon color="primarydarker" darkColor="white" size={20}>
        <FontAwesome6 name="check" />
      </AppIcon>

      <ThemedText>{item}</ThemedText>
    </View>
  );
}

export default ServiceCard;
