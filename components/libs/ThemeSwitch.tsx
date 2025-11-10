import { useThemeColor } from "@/hooks/useThemeColor";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

type SwitchProps = {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
};

const ThemeSwitch = ({ value, onValueChange }: SwitchProps) => {
  const [isEnabled, setIsEnabled] = useState(value || false);
  const darkColor = useThemeColor("primarydarker");
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    onValueChange?.(newValue);
    Animated.timing(animatedValue, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  return (
    <TouchableOpacity onPress={toggleSwitch} style={styles.switchContainer}>
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{ translateX }],
            backgroundColor: isEnabled ? darkColor : "#FFFFFF",
          },
        ]}
      >
        {isEnabled ? (
          <MaterialIcons name="dark-mode" size={20} color="white" />
        ) : (
          <Entypo name="light-down" size={22} color="black" />
        )}
      </Animated.View>
      <View style={styles.track} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 40,
    height: 20,
    borderRadius: 15,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  track: {
    flex: 1,
    height: "100%",
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ThemeSwitch;
