import React from "react";
import { ThemedView } from "./ThemedView";

const Divider = () => {
  return (
    <ThemedView
      color="border"
      style={{
        height: 1,
        marginVertical: 10,
      }}
    />
  );
};

export default Divider;
