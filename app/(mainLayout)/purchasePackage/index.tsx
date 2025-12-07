import { ThemedView } from "@/components/libs/ThemedView";
import PurchagePackageContent from "@/components/package/PurchagePackageContent";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

const PurchasePackage = () => {
  const { data } = useLocalSearchParams();
  const packageData = JSON.parse(data as string);

  return (
    <ThemedView style={{ flex: 1 }} color="background">
      <ScrollView style={{ flex: 1 }}>
        <PurchagePackageContent packageInfo={packageData} />
      </ScrollView>
    </ThemedView>
  );
};

export default PurchasePackage;
