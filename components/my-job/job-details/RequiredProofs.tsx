import { ThemedText } from "@/components/libs/ThemedText";
import { RequiredProofs as ProofType } from "@/types/Job";
import React from "react";
import { View } from "react-native";

const RequiredProofs = ({ required_proofs }: { required_proofs: string }) => {
  const requiredProofs: ProofType[] = JSON.parse(required_proofs);
  return (
    <View>
      {requiredProofs.map((proof: ProofType, index: number) => (
        <View key={index}>
          <ThemedText style={{ textTransform: "capitalize" }}>
            {proof.type}:
          </ThemedText>
          <ThemedText>{proof.description}</ThemedText>
        </View>
      ))}
    </View>
  );
};

export default RequiredProofs;
