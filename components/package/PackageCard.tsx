import { useThemeColor } from "@/hooks/useThemeColor";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../libs/Button";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

const PackageCard = ({ highlight = false }) => {
  const iconColor = useThemeColor("primaryDarker");
  const features = [
    "No ads",
    "unlimited jobs provide",
    "Premium support",
    "Unlimited task submition",
  ];
  return (
    <ThemedView style={styles.container}>
      {highlight && (
        <ThemedView color="primaryDarker" style={styles.highlight}>
          <ThemedText
            style={{ textAlign: "center" }}
            color="warning"
            type="small"
          >
            Popular
          </ThemedText>
        </ThemedView>
      )}
      <View style={{ alignItems: "center" }}>
        <ThemedView color="primaryDarker" style={styles.name}>
          <ThemedText color="white" type="defaultSemiBold">
            Basic
          </ThemedText>
        </ThemedView>
        <ThemedText color="primaryDarker" type="subtitle">
          $30
        </ThemedText>
        <ThemedText color="placeHolder">3 months access</ThemedText>
      </View>
      {features.map((item, index) => (
        <View key={index} style={styles.features}>
          <FontAwesome name="check-square" size={24} color={iconColor} />
          <ThemedText>{item}</ThemedText>
        </View>
      ))}
      <Button title="Get started" style={{ marginTop: 10 }} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
    overflow: "hidden",
  },
  name: {
    paddingHorizontal: 20,
    borderRadius: 100,
    paddingVertical: 2,
  },
  features: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    gap: 6,
  },
  highlight: {
    width: 150,
    position: "absolute",
    top: 25,
    right: -35,
    paddingVertical: 4,
    paddingHorizontal: 40,
    transform: [{ rotate: "45deg" }],
  },
});

export default PackageCard;
