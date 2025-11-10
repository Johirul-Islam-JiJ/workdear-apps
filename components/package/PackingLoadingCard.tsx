import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, View, ViewStyle } from "react-native";
import { ThemedView } from "../libs/ThemedView";

const PackageLoadingCard = () => {
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

  const container: ViewStyle = {
    paddingVertical: 15,
    paddingHorizontal: 12,
    gap: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  };

  return (
    <ThemedView color="card" style={container}>
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

      <View style={{ gap: 8 }}>
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
      </View>

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
