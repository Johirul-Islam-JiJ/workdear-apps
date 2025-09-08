import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./ThemedText";

interface ButtonProps extends PressableProps {
  title: string;
  variant?: "Contained" | "Outlined" | "Text";
  color?: ColorScheme;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "Contained",
  style,
  loading,
  color = "primaryDarker",
  ...props
}) => {
  const backgroundColor = useThemeColor(color);
  const textColor = useThemeColor(variant === "Contained" ? "white" : color);
  const borderColor = variant === "Outlined" ? backgroundColor : "transparent";

  const containerStyle: ViewStyle = {
    height: 40,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: variant === "Contained" ? backgroundColor : "transparent",
    borderWidth: variant === "Outlined" ? 1 : 0,
    borderColor: borderColor,
    opacity: props.disabled ? 0.5 : 1,
    flexDirection: "row",
  };

  return (
    <Pressable
      {...props}
      disabled={loading || props.disabled}
      style={(state) => [
        containerStyle,
        typeof style === "function" ? style(state) : style,
      ]}
      android_ripple={{
        color: useThemeColor(
          variant === "Outlined" ? "placeHolder" : "primaryLight"
        ),
      }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "Outlined" ? backgroundColor : textColor}
        />
      ) : (
        <ThemedText
          color={variant === "Outlined" ? "primaryDarker" : "white"}
          type="defaultSemiBold"
        >
          {title}
        </ThemedText>
      )}
    </Pressable>
  );
};

export default Button;
