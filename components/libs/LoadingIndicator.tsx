import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";

interface LoadingIndicatorProps {
  fullScreen?: boolean;
  style?: ViewStyle;
}

export default function LoadingIndicator({
  fullScreen = false,
  style,
}: LoadingIndicatorProps) {
  const primaryColor = useThemeColor("primarydark");
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
    <View style={containerStyle}>
      <View style={styles.dotContainer}>
        {bounceValues.map((val, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
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
    </View>
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
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
});
