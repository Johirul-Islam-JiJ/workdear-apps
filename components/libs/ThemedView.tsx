import { useColorScheme, View, type ViewProps } from "react-native";

import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  color?: ColorScheme;
  darkColor?: ColorScheme | null;
};

export function ThemedView({
  style,
  color = "white",
  darkColor = null,
  ...otherProps
}: ThemedViewProps) {
  const theme = useColorScheme() ?? "light";
  const dark = theme === "dark";
  const colorToUse = darkColor && dark ? darkColor : color;
  const backgroundColor = useThemeColor(colorToUse);

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
