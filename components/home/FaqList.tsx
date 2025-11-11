import { Faq } from "@/types/Faq";
import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ContentRenderer from "../libs/ContentRenderer";
import IconButton from "../libs/IconButton";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

const FaqList = ({ item }: { item: Faq }) => {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const animatedHeight = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    const finalValue = expanded ? 0 : contentHeight;

    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: finalValue,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue: expanded ? 0 : 1,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();

    setExpanded(!expanded);
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <ThemedView
      color="card"
      style={{
        borderRadius: 10,
        padding: 15,
        overflow: "hidden",
      }}
    >
      <TouchableWithoutFeedback onPress={toggleExpand}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedText
            style={{ marginBottom: 5, fontWeight: "bold", width: "85%" }}
            color="primarydark"
            darkColor="white"
          >
            {item.question}
          </ThemedText>

          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <IconButton
              icon="chevron-down"
              color="black"
              darkColor="white"
              size="sm"
              variant="ghost"
              onPress={toggleExpand}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>

      {/* Hidden content container */}
      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        <View
          style={{ position: "absolute", width: "100%" }}
          onLayout={(e: LayoutChangeEvent) =>
            setContentHeight(e.nativeEvent.layout.height)
          }
        >
          <ContentRenderer html={item.answer} />
        </View>
      </Animated.View>
    </ThemedView>
  );
};

export default FaqList;
