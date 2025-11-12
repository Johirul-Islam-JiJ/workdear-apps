import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useRef } from "react";
import { Animated, DimensionValue, Easing, ViewStyle } from "react-native";

interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
}

const Skeleton = ({
  width = "100%",
  height = 10,
  borderRadius = 5,
  style = {},
}: SkeletonProps) => {
  const placeHolderColor = useThemeColor("placeholder");
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const animationStyle: ViewStyle = {
    height: height,
    width: width,
    borderRadius: borderRadius,
    backgroundColor: placeHolderColor,
    opacity: pulseAnim,
    ...style,
  };

  return <Animated.View style={animationStyle} />;
};

export default Skeleton;
