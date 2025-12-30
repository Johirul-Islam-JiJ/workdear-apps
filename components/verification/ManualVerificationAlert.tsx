import React from "react";
import { View } from "react-native";
import Badge from "../libs/Badge";
import { ThemedText } from "../libs/ThemedText";

const ManualVerificationAlert = () => {
  const list = [
    {
      title: "Images section:",
      description: "Don't use copy images.",
    },
    {
      title: "Document section:",
      description: "Don't upload fake or edited documents.",
    },
    {
      title: "Verification Documents:",
      description: "Always use real and clear images for verification.",
    },
    {
      title: "Ban Warning:",
      description:
        "If you upload fake or edited documents, your account will be permanently banned without any warning.",
    },
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
              <Badge size="small" variant="dot" />{" "}
              <ThemedText style={{ fontWeight: "bold" }}>
                {item.title}
              </ThemedText>{" "}
              {item.description}
            </ThemedText>
          ))}
        </View>
      </View>
    </>
  );
};

export default ManualVerificationAlert;
