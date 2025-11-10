import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text, TextProps, useColorScheme } from "react-native";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "bodySemiBold"
  | "subtitle"
  | "caption"
  | "button"
  | "link"
  | "small"
  | "overline";

interface ThemedTextProps extends TextProps {
  color?: ColorScheme;
  variant?: TextVariant;
  underline?: boolean;
  darkColor?: ColorScheme;
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  style,
  color = "text",
  darkColor = null,
  variant = "body",
  underline = false,
  ...rest
}) => {
  const theme = useColorScheme() ?? "light";
  const dark = theme === "dark";
  const themeTextColor = darkColor && dark ? darkColor : color;
  const textColor = useThemeColor(
    variant === "link" ? "primarydark" : themeTextColor
  );

  const variantStyles: Record<TextVariant, object> = {
    h1: styles.H1,
    h2: styles.H2,
    h3: styles.H3,
    body: styles.Body,
    bodySemiBold: styles.BodySemiBold,
    subtitle: styles.Subtitle,
    caption: styles.Caption,
    button: styles.Button,
    link: styles.Link,
    small: styles.Small,
    overline: styles.Overline,
  };

  return (
    <Text
      style={[
        { color: textColor },
        variantStyles[variant],
        underline && { textDecorationLine: "underline" },
        style,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  H1: {
    fontSize: 36,
    lineHeight: 44,
    fontFamily: "RobotoSerifBold",
  },
  H2: {
    fontSize: 30,
    lineHeight: 38,
    fontFamily: "RobotoSerifSemiBold",
  },
  H3: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: "RobotoSerifSemiBold",
  },
  Body: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "RobotoSerifRegular",
  },
  BodySemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "RobotoSerifBold",
  },
  Subtitle: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: "RobotoSerifBold",
  },
  Caption: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "RobotoSerifRegular",
  },
  Button: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "RobotoSerifSemiBold",
  },
  Link: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "RobotoSerifSemiBold",
  },
  Small: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "RobotoSerifRegular",
  },
  Overline: {
    fontSize: 10,
    lineHeight: 12,
    fontFamily: "RobotoSerifRegular",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
