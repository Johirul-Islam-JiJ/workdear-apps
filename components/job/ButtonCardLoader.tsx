import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

const ButtonCardLoader = () => {
  const placeHolderColor = useThemeColor("placeHolder");
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

  return (
    <View style={{ flex: 1, gap: 8 }}>
      {[...Array(5)].map((_, i) => (
        <Animated.View
          key={i}
          style={{
            height: 40,
            borderRadius: 5,
            backgroundColor: placeHolderColor,
            opacity: pulseAnim,
          }}
        />
      ))}
    </View>
  );
};

export default ButtonCardLoader;
