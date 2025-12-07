import { ThemedView } from "@/components/libs/ThemedView";
import PurchasePackContent from "@/components/package/PurchasePackContent";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

const PurchasePackage = () => {
  const { data } = useLocalSearchParams();
  const packageData = JSON.parse(data as string);

  return (
    <ThemedView style={{ flex: 1 }} color="background">
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 10 }}>
          <PurchasePackContent packageInfo={packageData} />
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default PurchasePackage;
