import { ThemedView } from "@/components/libs/ThemedView";
import OverView from "@/components/profile/OverView";
import PackageInfo from "@/components/profile/PackageInfo";
import ProfileHeader from "@/components/profile/ProfileHeader";
import React from "react";
import { ScrollView, View } from "react-native";

const Profile = () => {
  return (
    <ThemedView style={{ flex: 1 }} color="background">
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 10, rowGap: 10 }}>
          <ProfileHeader />
          <PackageInfo />
          <OverView />
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default Profile;
