import { ColorScheme } from "@/constants/Colors";
import React from "react";
import { ViewStyle } from "react-native";
import { ThemedView } from "./ThemedView";

type Props = {
  color?: ColorScheme;
  style?: ViewStyle;
};

const Divider = ({ color = "gray.400", style }: Props) => {
  return (
    <ThemedView
      color={color}
      style={{
        height: 1,
        ...style,
      }}
    />
  );
};

export default Divider;
