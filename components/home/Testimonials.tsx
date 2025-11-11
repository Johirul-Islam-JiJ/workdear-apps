import React from "react";
import { Dimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { ThemedText } from "../libs/ThemedText";
import UserVoiceCard from "./UserVoiceCard";

export type UserReview = {
  name: string;
  title: string;
  quote: string;
  image: string;
  rating: number;
};

const Testimonials = () => {
  const { width } = Dimensions.get("window");
  const userVoices: UserReview[] = [
    {
      name: "Sarah Johnson",
      title: "Graphic Designer",
      quote:
        "WorkDear has completely transformed my freelancing career. I've landed over 50 projects and built lasting relationships with amazing clients. The platform's security and payment protection give me peace of mind.",
      image: require("@/assets/images/profile.jpg"),
      rating: 4.8,
    },
    {
      name: "Mike Chen",
      title: "Web Developer",
      quote:
        "The quality of projects on WorkDear is outstanding. I've found clients who truly value my expertise and are willing to pay premium rates. It's not just about quantity, it's about quality partnerships",
      image: require("@/assets/images/profile1.jpg"),
      rating: 4.8,
    },
    {
      name: "Sara Malik",
      title: "Content Writer",
      quote:
        "As a client, finding the right talent was always a challenge until I discovered WorkDear. The platform's vetting process ensures I work with skilled professionals who deliver exceptional results every time.",
      image: require("@/assets/images/profile3.jpg"),
      rating: 4.8,
    },
    {
      name: "Emma Watson",
      title: "Digital Marketer",
      quote:
        "The quality of projects on WorkDear is outstanding. I've found clients who truly value my expertise and are willing to pay premium rates. It's not just about quantity, it's about quality partnerships.",
      image: require("@/assets/images/profile4.jpg"),
      rating: 4.8,
    },
  ];

  return (
    <View>
      <ThemedText variant="subtitle" color="primarydark" darkColor="white">
        What Our Community Says
      </ThemedText>

      <View style={{ marginTop: 10 }}>
        <Carousel
          loop
          width={width - 20}
          height={220}
          data={userVoices}
          scrollAnimationDuration={500}
          autoPlay={true}
          autoPlayInterval={3000}
          renderItem={({ item, index }) => (
            <UserVoiceCard key={index} item={item} />
          )}
        />
      </View>
    </View>
  );
};

export default Testimonials;
