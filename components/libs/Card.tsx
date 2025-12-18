import { ColorScheme } from "@/constants/Colors";
import React from "react";
import { ViewStyle } from "react-native";
import { ThemedView } from "./ThemedView";
type props = {
  children: React.ReactNode;
  style?: ViewStyle;
  color?: ColorScheme;
  darkColor?: ColorScheme;
};

const Card = ({ children, style = {}, color = "card", darkColor }: props) => {
  const wrapperStyle: ViewStyle = {
    borderRadius: 10,
    padding: 10,
    rowGap: 10,
    ...style,
  };
  return (
    <ThemedView color={color} darkColor={darkColor} style={wrapperStyle}>
      {children}
    </ThemedView>
  );
};

export default Card;
