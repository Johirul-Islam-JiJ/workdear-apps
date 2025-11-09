import { StyleSheet, Text, type TextProps } from "react-native";

import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

type ThemedTextProps = TextProps & {
  color?: ColorScheme;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "small";
  underline?: boolean;
};

export function ThemedText({
  style,
  color = "text",
  type = "default",
  underline = false,
  ...rest
}: ThemedTextProps) {
  const textColor = useThemeColor(type === "link" ? "primarydark" : color);

  return (
    <Text
      style={[
        { color: textColor },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "small" ? styles.small : undefined,
        underline && { textDecorationLine: "underline" },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "RobotoSerifRegular",
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "RobotoSerifBold",
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontFamily: "RobotoSerifSemiBold",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "RobotoSerifBold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    fontFamily: "RobotoSerifSemiBold",
  },
  small: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: "RobotoSerifRegular",
  },
});
