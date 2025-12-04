import Packages from "@/components/home/package/Packages";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";
import { ScrollView } from "react-native";

const PackageScreen = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <ThemedView color="background" style={{ padding: 10 }}>
        <Packages title={false} />
      </ThemedView>
    </ScrollView>
  );
};

export default PackageScreen;
