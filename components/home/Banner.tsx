import { useFocusEffect } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React, { useCallback, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import Button from "../libs/Button";
import { ThemedText } from "../libs/ThemedText";

const { width } = Dimensions.get("window");

const heroData = [
  {
    id: 1,
    title: "Best Microjob & Freelancing Site to Make Money Online",
    buttonText: "Start earning now",
    image: require("@/assets/images/banner-1.png"),
  },
  {
    id: 2,
    title: "Turn Your Skills Into Income, Join the Top Microjob Platform",
    buttonText: "Start Your First Job",
    image: require("@/assets/images/banner-2.jpg"),
  },
  {
    id: 3,
    title: "Work Anytime, Anywhere Earn Online with Microjobs",
    buttonText: "Begin Your Journey",
    image: require("@/assets/images/banner-3.jpg"),
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }).start(() => {
          setCurrentSlide((prev) => (prev + 1) % heroData.length);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }).start();
        });
      }, 5000);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();

      return () => clearInterval(interval);
    }, [])
  );

  return (
    <ImageBackground
      source={heroData[currentSlide].image}
      style={styles.background}
      resizeMode="cover"
    >
      <BlurView intensity={50} style={styles.blur}>
        <View style={styles.overlay} />

        {/* slider */}
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <ThemedText variant="subtitle" color="white">
            {heroData[currentSlide].title}
          </ThemedText>
          <Button
            title={heroData[currentSlide].buttonText}
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
    paddingTop: 40,
  },
});

export default Banner;
