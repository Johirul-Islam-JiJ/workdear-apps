import { RecentBuyers } from "@/types/ticket";
import React from "react";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";

const RecentPurchase = ({ data }: { data: RecentBuyers[] }) => {
  return (
    <Card>
      <ThemedText variant="subtitle">Recent purchases</ThemedText>
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
            <ThemedText variant="body2">{item.user}</ThemedText>
            <ThemedText variant="body2">{item.ticket_buy}</ThemedText>
          </Card>
        ))
      ) : (
        <ThemedText
          darkColor="gray.300"
          color="gray.700"
          style={{ textAlign: "center" }}
        >
          No recent purchases
        </ThemedText>
      )}
    </Card>
  );
};

export default RecentPurchase;
