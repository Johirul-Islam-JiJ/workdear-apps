import React from "react";
import { ThemedView } from "./ThemedView";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemedView
      color="card"
      style={{ borderRadius: 10, padding: 10, rowGap: 10 }}
    >
      {children}
    </ThemedView>
  );
};

export default Card;
