import Banner from "@/components/home/Banner";
import FAQ from "@/components/home/FAQ";
import HomeJobLists from "@/components/home/HomeJobLists";
import HowItWorks from "@/components/home/HowItWorks";
import Services from "@/components/home/Services";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import { ThemedView } from "@/components/libs/ThemedView";
import Packages from "@/components/package/Packages";
import React from "react";
import { ScrollView } from "react-native";

const HomeScreen = () => {
  const wrapper = {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    rowGap: 20,
  };
  return (
    <ScrollView style={{ flex: 1, position: "relative" }}>
      <Banner />
      <ThemedView color="background" style={wrapper}>
        <Statistics />
        <HomeJobLists />
        <Services />
        <Packages />
        <HowItWorks />
        <FAQ />
        <Testimonials />
      </ThemedView>
    </ScrollView>
  );
};

export default HomeScreen;
