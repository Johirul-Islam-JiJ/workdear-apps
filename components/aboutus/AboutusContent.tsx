import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import React from "react";
import { View, ViewStyle } from "react-native";
import Statistics from "../home/Statistics";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";

const AboutusContent = () => {
  const bannerWrapper: ViewStyle = {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  return (
    <View>
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: "https://www.workdear.com/about-image.png" }}
          style={{ width: "100%", height: 200 }}
        />
        <BlurView intensity={50} style={bannerWrapper}>
          <ThemedText style={{ fontWeight: "bold" }} color="white">
            It's All Start With “We”
          </ThemedText>
          <ThemedText variant="h1" color="white">
            About Us
          </ThemedText>
        </BlurView>
      </View>
      <View style={{ rowGap: 20, padding: 10 }}>
        <Statistics />
        <Card style={{ rowGap: 20 }}>
          <View>
            <ThemedText variant="subtitle" style={{ textAlign: "center" }}>
              Your Satisfaction is Our Commitment
            </ThemedText>
            <ThemedText style={{ textAlign: "justify" }}>
              Work dear is a crowdsource service with to more than 900,000+
              Workers. Work dear is a freelancing, outsourcing and crowdsourcing
              marketplace. We connect clients and freelancers globally from all
              over the World. Through our marketplace, clients can hire
              freelancers to do work in areas such as promoting on social
              networks, writing, testing websites, data entry
            </ThemedText>
          </View>

          <Image
            source={{ uri: "https://www.workdear.com/about-image-2.png" }}
            alt="About image 2"
            style={{ width: "100%", height: 200, borderRadius: 10 }}
          />

          <View>
            <ThemedText variant="subtitle" style={{ textAlign: "center" }}>
              Ask People To Help You
            </ThemedText>
            <ThemedText style={{ textAlign: "justify" }}>
              This is how Small Gigs are great work! They are easy to do and
              require little time to finish. There are jobs like take a survey,
              categorize images, help promote content and many others. Get
              credited immediately after task is reviewed and dont wait a month
              or more for a pay out. Our team helps individuals, small
              businesses and professionals to create low cost publicity and
              marketing campaigns to increase sales, ranking, backlinks and much
              more..
            </ThemedText>
          </View>
        </Card>
      </View>
    </View>
  );
};

export default AboutusContent;
