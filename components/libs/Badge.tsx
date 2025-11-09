import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";

type IconName = keyof typeof Ionicons.glyphMap;

interface BadgeProps {
  label?: string;
  icon?: IconName;
  color?: ColorScheme;
  variant?: "Contained" | "Outlined" | "Dot";
  size?: "small" | "medium" | "large";
  style?: ViewStyle;
}

const Badge: React.FC<BadgeProps> = ({
  label,
  icon,
  color = "primarydark",
  variant = "Contained",
  size = "medium",
  style,
}) => {
  const backgroundColor = useThemeColor(color);

  const sizeStyles = {
    small: { paddingHorizontal: 6, paddingVertical: 2, fontSize: 12 },
    medium: { paddingHorizontal: 8, paddingVertical: 3, fontSize: 14 },
    large: { paddingHorizontal: 10, paddingVertical: 4, fontSize: 16 },
  }[size];

  if (variant === "Dot") {
    return (
      <View
        style={[
          styles.dot,
          { backgroundColor },
          size === "small"
            ? { width: 8, height: 8 }
            : size === "large"
            ? { width: 12, height: 12 }
            : { width: 10, height: 10 },
          style,
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            variant === "Contained" ? backgroundColor : "transparent",
          borderColor: variant === "Outlined" ? backgroundColor : "transparent",
          borderWidth: variant === "Outlined" ? 1 : 0,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          paddingVertical: sizeStyles.paddingVertical,
        },
        style,
      ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={sizeStyles.fontSize}
          color={variant === "Contained" ? "white" : (color as ColorScheme)}
        />
      )}
      {label && (
        <ThemedText
          color={variant === "Contained" ? "white" : (color as ColorScheme)}
          variant="button"
          style={{ fontSize: sizeStyles.fontSize }}
        >
          {label}
        </ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
  },
  dot: {
    borderRadius: 50,
  },
});

export default Badge;
