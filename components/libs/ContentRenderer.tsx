import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { useWindowDimensions } from "react-native";
import RenderHTML, { MixedStyleRecord } from "react-native-render-html";

export default function ContentRenderer({ html }: { html: string }) {
  const { width } = useWindowDimensions();
  const textColor = useThemeColor("text");

  const tagsStyles: MixedStyleRecord = {
    p: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 8,
      color: textColor,
    },
    strong: {
      fontWeight: "bold",
      color: textColor,
    },
    h1: {
      fontSize: 26,
      fontWeight: "700",
      marginBottom: 12,
      color: textColor,
    },
    h2: {
      fontSize: 22,
      fontWeight: "600",
      marginBottom: 10,
      color: textColor,
    },
    a: {
      textDecorationLine: "underline",
      color: textColor,
    },
    ul: {
      marginLeft: 16,
      marginBottom: 10,
      color: textColor,
    },
    li: {
      fontSize: 16,
      color: textColor,
    },
  };

  return (
    <RenderHTML
      contentWidth={width}
      source={{ html }}
      tagsStyles={tagsStyles}
    />
  );
}
