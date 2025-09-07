import { View, type ViewProps } from "react-native";

import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  color?: ColorScheme;
};

export function ThemedView({
  style,
  color = "white",
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(color);

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
