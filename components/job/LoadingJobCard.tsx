import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import { ThemedView } from "../libs/ThemedView";

const LoadingJobCard = () => {
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
        flexDirection: "row",
        justifyContent: "space-between",
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
      <View style={{ flex: 1, gap: 8 }}>
        {[...Array(2)].map((_, i) => (
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
            height: 10,
            width: 150,
            borderRadius: 5,
            backgroundColor: placeHolderColor,
            opacity: pulseAnim,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {[...Array(2)].map((_, i) => (
            <Animated.View
              key={i}
              style={{
                height: 10,
                width: 50,
                borderRadius: 5,
                backgroundColor: placeHolderColor,
                opacity: pulseAnim,
              }}
            />
          ))}
        </View>
      </View>

      <Animated.View
        style={{
          height: 50,
          width: 50,
          borderRadius: 25,
          borderWidth: 10,
          borderColor: placeHolderColor,
          opacity: pulseAnim,
        }}
      />
    </ThemedView>
  );
};

export default LoadingJobCard;
