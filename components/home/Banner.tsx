import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Button from "../libs/Button";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

const { width } = Dimensions.get("window");

const heroData = [
  {
    id: 1,
    title: "Best Microjob & Freelancing Site to Make Money Online",
    buttonText: "Start earning now",
    image: require("../../assets/images/banner-1.png"),
  },
  {
    id: 2,
    title: "Turn Your Skills Into Income, Join the Top Microjob Platform",
    buttonText: "Start Your First Job",
    image: require("../../assets/images/banner-2.jpg"),
  },
  {
    id: 3,
    title: "Work Anytime, Anywhere Earn Online with Microjobs",
    buttonText: "Begin Your Journey",
    image: require("../../assets/images/banner-3.jpg"),
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const interval = setInterval(() => {
      // fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        // switch slide
        setCurrentSlide((prev) => (prev + 1) % heroData.length);

        // fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }).start();
      });
    }, 5000);

    // initial fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground
      source={heroData[currentSlide].image}
      style={styles.background}
      resizeMode="cover"
    >
      <BlurView intensity={50} style={styles.blur}>
        <View style={styles.overlay} />
        <View style={styles.navBar}>
          <Pressable>
            <FontAwesome6 name="bars" size={24} color="white" />
          </Pressable>

          <View style={styles.balanceContainer}>
            <ThemedView color="primaryDarker" style={styles.balance}>
              <ThemedText color="white" type="defaultSemiBold">
                $9800.9999
              </ThemedText>
            </ThemedView>
            <ThemedView color="primaryLight" style={styles.balance}>
              <ThemedText color="white" type="defaultSemiBold">
                $9800.9999
              </ThemedText>
            </ThemedView>
            <View style={{ position: "relative" }}>
              <Ionicons name="notifications-sharp" size={24} color="yellow" />
              <ThemedView color="primaryLight" style={styles.notification} />
            </View>
          </View>
        </View>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <ThemedText type="subtitle" color="white">
            {heroData[currentSlide].title}
          </ThemedText>
          <Button
            title={heroData[currentSlide].buttonText}
            color="primaryLight"
            style={{ width: 200 }}
          />
        </Animated.View>
      </BlurView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: width,
    height: 200,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(21, 36, 29, 0.5)",
  },
  content: {
    paddingHorizontal: 20,
    zIndex: 2,
    rowGap: 10,
  },
  navBar: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  balance: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
  },
  notification: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 100,
  },
});

export default Banner;
