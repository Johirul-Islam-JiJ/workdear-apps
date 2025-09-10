import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { ThemedView } from "../libs/ThemedView";

const PackageLoadingCard = () => {
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
    <ThemedView
      color="white"
      style={{
        paddingVertical: 10,
        paddingHorizontal: 10,
        gap: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Animated.View
        style={{
          height: 30,
          width: 150,
          borderRadius: 5,
          backgroundColor: placeHolderColor,
          opacity: pulseAnim,
          alignSelf: "center",
        }}
      />
      <Animated.View
        style={{
          height: 10,
          width: 200,
          borderRadius: 5,
          backgroundColor: placeHolderColor,
          opacity: pulseAnim,
          alignSelf: "center",
        }}
      />

      {[...Array(5)].map((_, i) => (
        <Animated.View
          key={i}
          style={{
            height: 10,
            borderRadius: 5,
            backgroundColor: placeHolderColor,
            opacity: pulseAnim,
          }}
        />
      ))}
      <Animated.View
        style={{
          height: 30,
          borderRadius: 5,
          backgroundColor: placeHolderColor,
          opacity: pulseAnim,
        }}
      />
    </ThemedView>
  );
};

export default PackageLoadingCard;
