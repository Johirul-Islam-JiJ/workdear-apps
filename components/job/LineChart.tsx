import React from "react";
import { View } from "react-native";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

type props = {
  label: string;
  value: number;
};

const LineChart = ({ label, value }: props) => {
  return (
    <View style={{ flex: 1, gap: 3 }}>
      <ThemedText
        variant="small"
        style={{ textAlign: "center", fontWeight: "bold" }}
      >
        {label}
      </ThemedText>
      <ThemedView
        color="gray.400"
        style={{ height: 6, borderRadius: 10, overflow: "hidden" }}
      >
        <ThemedView
          color="success"
          style={{ height: "100%", width: `${value}%` }}
        />
      </ThemedView>
    </View>
  );
};

export default LineChart;
