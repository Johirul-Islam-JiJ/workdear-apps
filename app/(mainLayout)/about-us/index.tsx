import AboutusContent from "@/components/aboutus/AboutusContent";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";
import { ScrollView } from "react-native";

const Aboutus = () => {
  return (
    <ThemedView style={{ flex: 1 }} color="background">
      <ScrollView style={{ flex: 1 }}>
        <AboutusContent />
      </ScrollView>
    </ThemedView>
  );
};

export default Aboutus;
