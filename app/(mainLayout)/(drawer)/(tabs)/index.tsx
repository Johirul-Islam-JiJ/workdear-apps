import Banner from "@/components/home/Banner";
import FAQ from "@/components/home/FAQ";
import HomeJobLists from "@/components/home/HomeJobLists";
import HowItWorks from "@/components/home/HowItWorks";
import Packages from "@/components/home/package/Packages";
import Services from "@/components/home/Services";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import { ThemedView } from "@/components/libs/ThemedView";
import useGlobalRefresh from "@/hooks/useGlobalRefresh";
import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";

const HomeScreen = () => {
  const refresh = useGlobalRefresh();
  const [refreshing, setRefreshing] = useState(false);

  const wrapper = {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    rowGap: 20,
  };
  return (
    <ScrollView
      style={{ flex: 1, position: "relative" }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            refresh();
            setTimeout(() => setRefreshing(false), 600);
          }}
        />
      }
    >
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
