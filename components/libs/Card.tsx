import React from "react";
import { ViewStyle } from "react-native";
import { ThemedView } from "./ThemedView";
type props = { children: React.ReactNode; style?: ViewStyle };

const Card = ({ children, style = {} }: props) => {
  const wrapperStyle: ViewStyle = {
    borderRadius: 10,
    padding: 10,
    rowGap: 10,
    ...style,
  };
  return (
    <ThemedView color="card" style={wrapperStyle}>
      {children}
    </ThemedView>
  );
};

export default Card;
