import { ThemedView } from "@/components/libs/ThemedView";
import NotificationContent from "@/components/notification/NotificationContent";
import React from "react";
import { ScrollView } from "react-native";

const Index = () => {
  return (
    <ThemedView style={{ flex: 1 }} color="background">
      <ScrollView style={{ flex: 1 }}>
        <NotificationContent />
      </ScrollView>
    </ThemedView>
  );
};

export default Index;
