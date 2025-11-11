import { useThemeColor } from "@/hooks/useThemeColor";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  Appearance,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const ThemeSwitch = () => {
  const theme = useColorScheme() ?? "light";
  const value = theme === "dark";

  const [isEnabled, setIsEnabled] = useState(value || false);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
  const darkColor = useThemeColor("primarydarker");
  const backgroundColor = useThemeColor("gray.400");

  const toggleTheme = () => {
    const currentScheme = Appearance.getColorScheme();
    Appearance.setColorScheme(currentScheme === "dark" ? "light" : "dark");
  };

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    toggleTheme();
    Animated.timing(animatedValue, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 25],
  });

  return (
    <TouchableOpacity
      onPress={toggleSwitch}
      style={[styles.switchContainer, { backgroundColor }]}
    >
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
    width: 45,
    height: 20,
    borderRadius: 15,
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
