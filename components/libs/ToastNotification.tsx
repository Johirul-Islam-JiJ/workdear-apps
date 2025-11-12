import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hideNotification } from "@/store/slices/notification";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect } from "react";
import { Animated } from "react-native";
import { ThemedText } from "./ThemedText";

const ToastNotification = () => {
  const dispatch = useAppDispatch();
  const { visible, message, type } = useAppSelector(
    (state) => state.notification
  );

  const textColor = useThemeColor(
    type === "error" ? "error" : type === "success" ? "primarydark" : "text"
  );
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => dispatch(hideNotification()));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: "50%",
        left: "10%",
        right: "10%",
        transform: [{ translateY: "-50%" }],
        padding: 15,
        height: 200,
        borderRadius: 10,
        backgroundColor: "white",
        opacity,
        elevation: 5,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {type === "success" ? (
        <AntDesign name="check-circle" size={50} color={textColor} />
      ) : type === "error" ? (
        <MaterialIcons name="error" size={50} color={textColor} />
      ) : (
        <Entypo name="info-with-circle" size={50} color={textColor} />
      )}
      <ThemedText style={{ color: textColor, textAlign: "center" }}>
        {message}
      </ThemedText>
    </Animated.View>
  );
};

export default ToastNotification;
