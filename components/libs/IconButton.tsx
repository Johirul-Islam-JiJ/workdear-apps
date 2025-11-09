import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type IconName = keyof typeof Ionicons.glyphMap;

type IconButtonProps = {
  icon: IconName;
  size?: "sm" | "md" | "lg";
  color?: ColorScheme;
  variant?: "solid" | "outline" | "ghost";
  onPress?: () => void;
  disabled?: boolean;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = "md",
  color = "background",
  variant = "solid",
  onPress,
  disabled = false,
}) => {
  const colorValue = useThemeColor(color);
  const sizeMap = {
    sm: 32,
    md: 40,
    lg: 48,
  };

  const iconSizeMap = {
    sm: 16,
    md: 22,
    lg: 28,
  };

  const buttonSize = sizeMap[size];
  const iconSize = iconSizeMap[size];

  const backgroundColor =
    variant === "solid"
      ? `${colorValue}20`
      : variant === "outline"
      ? "transparent"
      : "transparent";

  const borderColor = variant === "outline" ? colorValue : "transparent";
  const opacity = disabled ? 0.5 : 1;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      style={[
        styles.container,
        {
          width: buttonSize,
          height: buttonSize,
          backgroundColor,
          borderColor,
          opacity,
        },
      ]}
    >
      <View>
        <Ionicons name={icon} size={iconSize} color={colorValue} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconButton;
