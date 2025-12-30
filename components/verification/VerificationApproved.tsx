import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import AppIcon from "../libs/AppIcon";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";

const VerificationApproved = () => {
  return (
    <Card>
      <View style={{ alignItems: "center" }}>
        <AppIcon color="success" size={100}>
          <FontAwesome name="check-circle" />
        </AppIcon>
      </View>
      <ThemedText
        variant="subtitle"
        color="success"
        style={{ textAlign: "center" }}
      >
        Congratulate! Your account has been verified
      </ThemedText>
    </Card>
  );
};

export default VerificationApproved;
