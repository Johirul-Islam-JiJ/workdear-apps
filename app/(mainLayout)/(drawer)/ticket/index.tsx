import { ThemedView } from "@/components/libs/ThemedView";
import TicketContend from "@/components/ticket/TicketContend";
import React from "react";
import { ScrollView } from "react-native";

const Ticket = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <TicketContend />
      </ScrollView>
    </ThemedView>
  );
};

export default Ticket;
