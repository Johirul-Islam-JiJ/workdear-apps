import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { ThemedText } from "./ThemedText";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  cutout: number;
  description: string;
};

export default function DonutChat({ cutout = 0, description }: Props) {
  const primaryColor = useThemeColor("primarydark");
  const borderColor = useThemeColor("border");
  const radius = 35;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const progress = useSharedValue(0); // 0 → 1

  useEffect(() => {
    progress.value = withTiming(cutout / 100, { duration: 1500 });
  }, [cutout]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  return (
    <View style={styles.container}>
      <Svg height={radius * 2 + strokeWidth} width={radius * 2 + strokeWidth}>
        <Circle
          stroke={borderColor}
          fill="none"
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          stroke={primaryColor}
          fill="none"
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
      </Svg>
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText>{description}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
