import Banner from "@/components/home/Banner";
import FAQ from "@/components/home/FAQ";
import HomeJobLists from "@/components/home/HomeJobLists";
import HowItWorks from "@/components/home/HowItWorks";
import Packages from "@/components/home/package/Packages";
import Services from "@/components/home/Services";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import { ThemedView } from "@/components/libs/ThemedView";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";

const HomeScreen = () => {
  const router = useRouter();

  useEffect(() => router.push("/(mainLayout)/paymentDetails"), []);

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
        <Testimonials />
        <FAQ />
      </ThemedView>
    </ScrollView>
  );
};

export default HomeScreen;
