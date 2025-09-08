import { BlurView } from "expo-blur";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Button from "../libs/Button";
import { ThemedText } from "../libs/ThemedText";

const Banner = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/banner-1.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Blur effect */}
      <BlurView intensity={50} style={styles.blur}>
        {/* Dark overlay */}
        <View style={styles.overlay} />

        <View style={styles.content}>
          <ThemedText type="subtitle" color="white">
            Work Anytime, Anywhere Earn Online with Microjobs
          </ThemedText>
          <Button
            title="Begin Your Journey"
            color="primaryLight"
            style={{ width: 200 }}
          />
        </View>
      </BlurView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: 200,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
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
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Banner;
