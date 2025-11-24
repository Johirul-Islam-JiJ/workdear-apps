import { ThemedView } from "@/components/libs/ThemedView";
import ProfileHeader from "@/components/profile/ProfileHeader";
import React from "react";
import { ScrollView } from "react-native";

const Profile = () => {
  return (
    <ThemedView style={{ flex: 1 }} color="background">
      <ScrollView style={{ flex: 1 }}>
        <ProfileHeader />
      </ScrollView>
    </ThemedView>
  );
};

export default Profile;
