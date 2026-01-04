import { useAppSelector } from "@/hooks/redux";
import React from "react";
import { DimensionValue, View } from "react-native";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const { generalData } = useAppSelector((state) => state.settings);

  const services = generalData.experience_the_best_services ?? [];

  return (
    <View>
      <ThemedText
        variant="subtitle"
        color="primarydark"
        darkColor="white"
        style={{ textAlign: "right" }}
      >
        Experience the best
      </ThemedText>
      <ThemedText
        variant="subtitle"
        color="primarydark"
        darkColor="white"
        style={{ textAlign: "right" }}
      >
        Services
      </ThemedText>

      <Line width="40%" />
      <Line width="60%" />
      <View style={{ rowGap: 10, marginTop: 15 }}>
        {services.map((item, index) => (
          <ServiceCard key={index} item={item} index={index} />
        ))}
      </View>
    </View>
  );
};

function Line({ width }: { width: DimensionValue }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <ThemedView
        color="primarydark"
        darkColor="white"
        style={{ width: 15, height: 15, borderRadius: 50 }}
      />
      <ThemedView
        color="primarydark"
        darkColor="white"
        style={{ width, height: 5 }}
      />
    </View>
  );
}

export default Services;
