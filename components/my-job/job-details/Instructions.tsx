import { ThemedText } from "@/components/libs/ThemedText";
import { Job, Steps } from "@/types/Job";
import React from "react";
import { View } from "react-native";

const Instructions = ({ job }: { job: Job }) => {
  return (
    <>
      {JSON.parse(job.steps).map((step: Steps, index: number) => (
        <View key={index}>
          <ThemedText style={{ fontWeight: "bold" }}>
            Step {index + 1}:
          </ThemedText>
          <ThemedText>{step.instruction}</ThemedText>
        </View>
      ))}
    </>
  );
};

export default Instructions;
