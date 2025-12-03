import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";
import { ThemedView } from "./ThemedView";

interface LoadingIndicatorProps {
  fullScreen?: boolean;
  style?: ViewStyle;
  size?: "small" | "medium" | "large";
}

export default function LoadingIndicator({
  fullScreen = false,
  style,
  size = "medium",
}: LoadingIndicatorProps) {
  const primaryColor = useThemeColor("primarydark");

  const sizeStyles = {
    small: { width: 8, height: 8 },
    medium: { width: 12, height: 12 },
    large: { width: 16, height: 16 },
  }[size];

  const bounceValues = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    const animations = bounceValues.map((val, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(val, {
            toValue: 1,
            duration: 500,
            delay: index * 200,
            useNativeDriver: true,
          }),
          Animated.timing(val, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      )
    );

    Animated.stagger(200, animations).start();
  }, []);

  const containerStyle = [
    styles.container,
    fullScreen && styles.fullScreen,
    style,
  ];

  return (
    <ThemedView color="background" style={containerStyle}>
      <View style={styles.dotContainer}>
        {bounceValues.map((val, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              sizeStyles,
              {
                backgroundColor: primaryColor,
                transform: [
                  {
                    scale: val.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.5],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  fullScreen: {
    flex: 1,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  dot: {
    borderRadius: 6,
  },
});
