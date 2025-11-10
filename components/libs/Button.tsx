import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  View,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./ThemedText";

type IconName = keyof typeof Ionicons.glyphMap;

interface ButtonProps extends PressableProps {
  title: string | React.ReactNode;
  variant?: "contained" | "outlined" | "text" | "soft";
  color?: ColorScheme;
  loading?: boolean;
  size?: "small" | "medium" | "large";
  startIcon?: IconName | React.ReactNode;
  endIcon?: IconName | React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "contained",
  color = "primarydark",
  loading,
  size = "medium",
  startIcon,
  endIcon,
  style,
  ...props
}) => {
  const mainColor = useThemeColor(color);
  const lightColor = useThemeColor("primarylight");
  const placeholderColor = useThemeColor("placeholder");

  // ─── Size Config ──────────────────────────────────────────────
  const sizes = {
    small: {
      minHeight: 32,
      paddingHorizontal: 12,
      paddingVertical: 6,
      fontSize: 14,
      gap: 4,
    },
    medium: {
      minHeight: 40,
      paddingHorizontal: 16,
      paddingVertical: 8,
      fontSize: 16,
      gap: 6,
    },
    large: {
      minHeight: 48,
      paddingHorizontal: 20,
      paddingVertical: 12,
      fontSize: 18,
      gap: 8,
    },
  }[size];

  // ─── Color Logic ──────────────────────────────────────────────
  const backgroundColor =
    variant === "contained"
      ? mainColor
      : variant === "soft"
      ? `${mainColor}20`
      : "transparent";

  const borderColor = variant === "outlined" ? mainColor : "transparent";

  const textColor = variant === "contained" ? "white" : (color as ColorScheme);

  const iconColor = variant === "contained" ? "#fff" : mainColor;

  // ─── Container Style ───────────────────────────────────────────
  const containerStyle: ViewStyle = {
    minHeight: sizes.minHeight,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: sizes.paddingHorizontal,
    paddingVertical: sizes.paddingVertical,
    flexDirection: "row",
    backgroundColor,
    borderWidth: variant === "outlined" ? 1 : 0,
    borderColor,
    opacity: props.disabled ? 0.5 : 1,
    gap: sizes.gap,
  };

  // ─── Render Icon ───────────────────────────────────────────────
  const renderIcon = (
    icon?: React.ReactNode | keyof typeof Ionicons.glyphMap
  ) => {
    if (!icon) return null;

    if (typeof icon === "string") {
      return <Ionicons name={icon as IconName} size={18} color={iconColor} />;
    }
    return icon;
  };

  // ─── Render ───────────────────────────────────────────────────
  return (
    <Pressable
      {...props}
      disabled={loading || props.disabled}
      style={(state) => [
        containerStyle,
        typeof style === "function" ? style(state) : style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={iconColor} />
      ) : (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            {startIcon && renderIcon(startIcon)}

            {typeof title === "string" ? (
              <ThemedText
                variant="button"
                color={textColor}
                style={{ fontSize: sizes.fontSize }}
              >
                {title}
              </ThemedText>
            ) : (
              title
            )}
          </View>

          {endIcon && renderIcon(endIcon)}
        </>
      )}
    </Pressable>
  );
};

export default Button;
