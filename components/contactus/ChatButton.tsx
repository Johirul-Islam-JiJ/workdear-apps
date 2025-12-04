import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, View, ViewStyle } from "react-native";
import Button from "../libs/Button";

const ChatButton = () => {
  const backgroundColor = useThemeColor("card");
  const textColor = useThemeColor("text");

  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastTranslate = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(toastTranslate, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const messageWrapper: ViewStyle = {
    backgroundColor,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    opacity: toastOpacity,
    transform: [{ translateY: toastTranslate }],
    position: "relative",
  };
  const wrapper: ViewStyle = {
    marginTop: Dimensions.get("window").height / 10,
    alignSelf: "flex-end",
    marginRight: 10,
    gap: 10,
  };

  const nose: ViewStyle = {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: backgroundColor,
    position: "absolute",
    bottom: -10,
    right: "50%",
  };

  return (
    <View style={wrapper}>
      <Animated.View style={messageWrapper}>
        <Animated.Text style={{ color: textColor }}>
          How can we help you?
        </Animated.Text>
        <Animated.View style={nose} />
      </Animated.View>

      <Link href="/contact-us/chat" asChild>
        <Button title="Live Chat" startIcon="chatbox-ellipses-outline" />
      </Link>
    </View>
  );
};

export default ChatButton;
