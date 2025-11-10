import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, View, ViewStyle } from "react-native";
import { ThemedView } from "../libs/ThemedView";

const JobLoadingCard = () => {
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
    paddingVertical: 14,
    paddingHorizontal: 12,
    gap: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  };

  const item: ViewStyle = {
    height: 10,
    borderRadius: 5,
    backgroundColor: placeHolderColor,
    opacity: pulseAnim,
  };

  return (
    <ThemedView color="card" style={container}>
      <View style={{ gap: 7 }}>
        {[...Array(2)].map((_, i) => (
          <Animated.View key={i} style={item} />
        ))}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ width: "78%", gap: 7 }}>
          <View style={{ alignItems: "center" }}>
            <Animated.View style={[item, { width: "30%" }]} />
          </View>
          <Animated.View style={item} />
        </View>
        <View style={{ width: "20%", gap: 7 }}>
          <Animated.View style={item} />
          <Animated.View style={item} />
        </View>
      </View>
    </ThemedView>
  );
};

export default JobLoadingCard;
