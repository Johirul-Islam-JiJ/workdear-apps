import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { useColorScheme } from "react-native";

interface AppIconProps {
  children: React.ReactElement<{ color?: string; size?: number }>;
  color?: ColorScheme;
  darkColor?: ColorScheme | null;
  size?: number;
}

const AppIcon: React.FC<AppIconProps> = ({
  children,
  color = "black",
  darkColor,
  size,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const isDark = colorScheme === "dark";
  const colorToUse = isDark && darkColor ? darkColor : color;

  const iconColor = useThemeColor(colorToUse as ColorScheme);

  return React.cloneElement(children, {
    color: iconColor,
    size: size ?? children.props.size ?? 24,
  });
};

export default AppIcon;
