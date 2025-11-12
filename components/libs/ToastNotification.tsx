import { ColorScheme } from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hideNotification } from "@/store/slices/notification";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect } from "react";
import { Animated, ViewStyle } from "react-native";
import AppIcon from "./AppIcon";
import { ThemedText } from "./ThemedText";

const ToastNotification = () => {
  const backgroundColor = useThemeColor("card");
  const dispatch = useAppDispatch();
  const { visible, message, type } = useAppSelector(
    (state) => state.notification
  );

  const textColor: ColorScheme =
    type === "error" ? "error" : type === "success" ? "success" : "text";
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start(() => dispatch(hideNotification()));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const containerStyle: ViewStyle = {
    position: "absolute",
    bottom: 85,
    left: "10%",
    right: "10%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor,
    opacity,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  };

  return (
    <Animated.View style={containerStyle}>
      {type === "success" ? (
        <AppIcon color="success">
          <MaterialIcons name="check-circle" />
        </AppIcon>
      ) : type === "error" ? (
        <AppIcon color="error">
          <MaterialIcons name="error" />
        </AppIcon>
      ) : (
        <AppIcon color="info">
          <Entypo name="info-with-circle" />
        </AppIcon>
      )}
      <ThemedText color={textColor} style={{ width: "90%", fontSize: 18 }}>
        {message}
      </ThemedText>
    </Animated.View>
  );
};

export default ToastNotification;
