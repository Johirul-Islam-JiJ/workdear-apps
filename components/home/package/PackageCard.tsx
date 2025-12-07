import { PremiumPackage } from "@/types/PremiumPackage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppIcon from "../../libs/AppIcon";
import Button from "../../libs/Button";
import { ThemedText } from "../../libs/ThemedText";
import { ThemedView } from "../../libs/ThemedView";

type Props = {
  data: PremiumPackage;
  active?: boolean;
};

const PackageCard = ({ data, active }: Props) => {
  return (
    <ThemedView color="card" style={styles.container}>
      {data.highlighted && (
        <ThemedView color="primarydarker" style={styles.highlight}>
          <ThemedText
            style={{ textAlign: "center" }}
            color="white"
            variant="small"
          >
            Popular
          </ThemedText>
        </ThemedView>
      )}
      <View style={{ alignItems: "center" }}>
        <ThemedView color="primarydarker" style={styles.name}>
          <ThemedText color="white" variant="bodySemiBold">
            {data.name}
          </ThemedText>
        </ThemedView>
        <ThemedText
          color="primarydarker"
          darkColor="primarydark"
          variant="subtitle"
          style={{ marginTop: 10 }}
        >
          ${data.price}
        </ThemedText>
        <ThemedText
          color="gray.800"
          darkColor="gray.300"
          style={{ marginBottom: 5 }}
        >
          {data.duration} months access
        </ThemedText>
      </View>
      {data.feature.map((item, index) => (
        <View key={index} style={styles.features}>
          <AppIcon color="primarydarker">
            <FontAwesome name="check-square" />
          </AppIcon>
          <ThemedText>{item}</ThemedText>
        </View>
      ))}

      <Link
        asChild
        href={{
          pathname: "/(mainLayout)/purchasePackage",
          params: { data: JSON.stringify(data) },
        }}
      >
        <Button
          title={active ? "Currently active" : "Subscribe"}
          color={active ? "success" : "primarymain"}
          disabled={active}
          style={{ marginTop: 15 }}
        />
      </Link>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 10,
    position: "relative",
    overflow: "hidden",
  },
  name: {
    paddingHorizontal: 20,
    borderRadius: 5,
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
