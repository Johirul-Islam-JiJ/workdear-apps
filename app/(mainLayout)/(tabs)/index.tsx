import Banner from "@/components/home/Banner";
import HomeJobLists from "@/components/job/HomeJobLists";
import { ThemedView } from "@/components/libs/ThemedView";
import Packages from "@/components/package/Packages";
import React from "react";
import { ScrollView } from "react-native";

const HomeScreen = () => {
  const wrapper = {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    rowGap: 15,
  };
  return (
    <ScrollView style={{ flex: 1, position: "relative" }}>
      <Banner />
      <ThemedView color="background" style={wrapper}>
        <HomeJobLists />
        <Packages />
      </ThemedView>
    </ScrollView>
  );
};

export default HomeScreen;
