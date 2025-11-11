import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { View, ViewStyle } from "react-native";
import AppIcon from "../libs/AppIcon";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

type HowItWorksItem = {
  id: number;
  step: string;
  title: string;
  description: string;
};

const HowItWorks = () => {
  const data: HowItWorksItem[] = [
    {
      id: 1,
      step: "STEP 1",
      title: "Sign Up & Verify",
      description:
        "Create your account and complete verification to ensure a trusted community for everyone.",
    },
    {
      id: 2,
      step: "STEP 2",
      title: "Find or Post Jobs",
      description:
        "Browse available projects or post your job requirements. Connect with the right talent instantly.",
    },
    {
      id: 3,
      step: "STEP 3",
      title: "Earn & Withdraw Securely",
      description:
        "Complete projects, receive payments, and withdraw your earnings safely through our secure platform.",
    },
  ];

  return (
    <ThemedView color="card" style={{ borderRadius: 10, padding: 15 }}>
      <ThemedText variant="subtitle" color="primarydark" darkColor="white">
        How it works
      </ThemedText>
      <View style={{ marginTop: 10, rowGap: 10 }}>
        {data.map((item, index) => (
          <HowItWorksItem key={index} item={item} index={index} />
        ))}
      </View>
    </ThemedView>
  );
};

function HowItWorksItem({
  item,
  index,
}: {
  item: HowItWorksItem;
  index: number;
}) {
  const iconStyle: ViewStyle = {
    borderRadius: 40,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  };
  const sideBarStyle: ViewStyle = {
    height: index === 2 ? "80%" : "100%",
    width: 3,
    position: "absolute",
    top: 20,
    left: 8,
  };
  return (
    <View style={{ flexDirection: "row", gap: 8, position: "relative" }}>
      <View>
        <ThemedView color="success" style={iconStyle}>
          <AppIcon size={15} color="white">
            <FontAwesome6 name="check" />
          </AppIcon>
        </ThemedView>
        <ThemedView color="success" style={sideBarStyle} />
      </View>
      <View style={{ width: "90%" }}>
        <ThemedText color="gray.700" darkColor="gray.400">
          {item.step}
        </ThemedText>
        <ThemedText
          variant="bodySemiBold"
          color="primarydark"
          darkColor="white"
        >
          {item.title}
        </ThemedText>
        <ThemedText color="gray.800" darkColor="gray.200">
          {item.description}
        </ThemedText>
      </View>
    </View>
  );
}

export default HowItWorks;
