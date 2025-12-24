import { TopTicketBuyer as TopBuyerType } from "@/types/ticket";
import React from "react";
import { View } from "react-native";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

const TopTicketBuyer = ({ data }: { data: TopBuyerType[] }) => {
  return (
    <Card>
      <ThemedText variant="subtitle">Top ticket buyers</ThemedText>
      {data.length > 0 ? (
        data.map((item, index) => (
          <Card
            key={index}
            color="border"
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <ThemedView
                color={item.rank === 1 ? "success" : "primarydark"}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ThemedText color="white" variant="subtitle">
                  {item.rank}
                </ThemedText>
              </ThemedView>
              <ThemedText variant="body2">{item.user}</ThemedText>
            </View>
            <ThemedText variant="body2">{item.ticket_buy}</ThemedText>
          </Card>
        ))
      ) : (
        <ThemedText
          darkColor="gray.300"
          color="gray.700"
          style={{ textAlign: "center" }}
        >
          No ticket buyers
        </ThemedText>
      )}
    </Card>
  );
};

export default TopTicketBuyer;
