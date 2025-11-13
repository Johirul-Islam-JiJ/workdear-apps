import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

type IconName = keyof typeof Ionicons.glyphMap;

type IconButtonProps = {
  icon: IconName | React.ReactNode;
  size?: "sm" | "md" | "lg";
  color?: ColorScheme;
  darkColor?: ColorScheme | null;
  variant?: "solid" | "outline" | "ghost";
  onPress?: () => void;
  disabled?: boolean;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = "md",
  color = "background",
  darkColor = null,
  variant = "solid",
  onPress,
  disabled = false,
}) => {
  const theme = useColorScheme() ?? "light";
  const dark = theme === "dark";
  const colorToUse = darkColor && dark ? darkColor : color;
  const colorValue = useThemeColor(colorToUse);
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
        {typeof icon === "string" ? (
          <Ionicons
            name={icon as IconName}
            size={iconSize}
            color={colorValue}
          />
        ) : (
          icon
        )}
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
