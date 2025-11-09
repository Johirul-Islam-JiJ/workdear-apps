import React from "react";
import { ThemedView } from "./ThemedView";

const Divider = () => {
  return (
    <ThemedView
      color="border"
      style={{
        height: 1,
        marginVertical: 12,
        marginHorizontal: 16,
      }}
    />
  );
};

export default Divider;
