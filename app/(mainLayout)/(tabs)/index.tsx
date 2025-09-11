import Banner from "@/components/home/Banner";
import HomeJobLists from "@/components/job/HomeJobLists";
import Packages from "@/components/package/Packages";
import React from "react";
import { ScrollView, View } from "react-native";

const HomeScreen = () => {
  return (
    <ScrollView style={{ flex: 1, position: "relative" }}>
      <Banner />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          paddingVertical: 15,
          rowGap: 15,
        }}
      >
        <HomeJobLists />
        <Packages />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
