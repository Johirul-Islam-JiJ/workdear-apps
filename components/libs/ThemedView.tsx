import { useColorScheme, View, type ViewProps } from "react-native";

import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  color?: ColorScheme;
  darkColor?: ColorScheme | null;
  opacity?: { dark?: number; light?: number };
};

export function ThemedView({
  style,
  color = "white",
  darkColor = null,
  opacity,
  ...otherProps
}: ThemedViewProps) {
  const theme = useColorScheme() ?? "light";
  const dark = theme === "dark";
  const colorToUse = darkColor && dark ? darkColor : color;
  const bgColor = useThemeColor(colorToUse);
  const backgroundColor =
    opacity?.dark && dark
      ? `${bgColor}${opacity.dark}`
      : opacity?.light
      ? `${bgColor}${opacity.light}`
      : bgColor;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
