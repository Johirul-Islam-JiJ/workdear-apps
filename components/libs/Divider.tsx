import { ColorScheme } from "@/constants/Colors";
import React from "react";
import { ThemedView } from "./ThemedView";

const Divider = ({ color = "gray.400" }: { color?: ColorScheme }) => {
  return (
    <ThemedView
      color={color}
      style={{
        height: 1,
      }}
    />
  );
};

export default Divider;
