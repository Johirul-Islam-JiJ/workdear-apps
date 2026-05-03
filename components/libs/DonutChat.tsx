import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { ThemedText } from "./ThemedText";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type SegmentData = {
  value: number;
  color: string;
  arcLength: number;
  startOffset: number;
};

type SegmentArcProps = {
  seg: SegmentData;
  circumference: number;
  center: number;
  radius: number;
  strokeWidth: number;
  progress: SharedValue<number>;
};

function SegmentArc({
  seg,
  circumference,
  center,
  radius,
  strokeWidth,
  progress,
}: SegmentArcProps) {
  const animatedProps = useAnimatedProps(() => {
    const p = progress.value;
    const animArcLength = p * seg.arcLength;
    const animStartOffset = p * seg.startOffset;
    return {
      strokeDasharray: `${animArcLength} ${circumference - animArcLength}`,
      strokeDashoffset: -animStartOffset,
    };
  });

  return (
    <AnimatedCircle
      stroke={seg.color}
      fill="none"
      cx={center}
      cy={center}
      r={radius}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      transform={`rotate(-90, ${center}, ${center})`}
      animatedProps={animatedProps}
    />
  );
}

type Segment = {
  value: number;
  color: string;
};

type Props = {
  segments: Segment[];
  description: string;
  width?: number;
  stockWidth?: number;
};

export default function DonutChat({
  segments,
  description,
  width = 110,
  stockWidth = 20,
}: Props) {
  const radius = width;
  const strokeWidth = stockWidth;
  const circumference = 2 * Math.PI * radius;
  const center = radius + strokeWidth / 2;

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 1400 });
  }, []);

  let cumulative = 0;
  const segmentsData: SegmentData[] = segments.map((seg) => {
    const arcLength = (seg.value / 100) * circumference;
    const data = { ...seg, arcLength, startOffset: cumulative };
    cumulative += arcLength;
    return data;
  });

  return (
    <View style={styles.container}>
      <Svg
        height={radius * 2 + strokeWidth * 2}
        width={radius * 2 + strokeWidth * 2}
      >
        <Circle
          stroke="#CFD8DC"
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {segmentsData.map((seg, index) => (
          <SegmentArc
            key={index}
            seg={seg}
            circumference={circumference}
            center={center}
            radius={radius}
            strokeWidth={strokeWidth}
            progress={progress}
          />
        ))}
      </Svg>

      <View style={styles.label}>
        <ThemedText variant="small">{description}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  label: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
