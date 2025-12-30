import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import AppIcon from "../libs/AppIcon";
import Badge from "../libs/Badge";
import { ThemedText } from "../libs/ThemedText";

const FormAlert = () => {
  const list = [
    "Image file must be less than 300kb (Don’t use copy image)",
    "Don’t upload fake or edited document.",
    "Please use real and clear document for verification.",
  ];
  return (
    <>
      <ThemedText variant="subtitle">Manually account verification</ThemedText>
      <View>
        <ThemedText variant="bodySemiBold" color="warning">
          Attention Please
        </ThemedText>
        <View style={{ marginLeft: 10 }}>
          {list.map((item, index) => (
            <ThemedText key={index}>
              <Badge size="small" variant="dot" /> {item}
            </ThemedText>
          ))}
        </View>
      </View>
      <ThemedText color="warning">
        <AppIcon color="warning" size={16}>
          <FontAwesome name="warning" />
        </AppIcon>{" "}
        If you upload fake or edited document you will be permanently banned
        without any warning.
      </ThemedText>

      <ThemedText
        variant="bodySemiBold"
        style={{ textAlign: "center" }}
        color="primarydark"
      >
        Fill the form carefully
      </ThemedText>
    </>
  );
};

export default FormAlert;
