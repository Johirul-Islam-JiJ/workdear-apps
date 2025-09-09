import Banner from "@/components/home/Banner";
import JobLists from "@/components/job/JobLists";
import Button from "@/components/libs/Button";
import Packages from "@/components/package/Packages";
import { useAppDispatch } from "@/hooks/redux";
import { useNavigation } from "@/hooks/useNavigation";
import { logout } from "@/store/slices/user";
import React from "react";
import { ScrollView, View } from "react-native";

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  function handleLogout() {
    dispatch(logout());
    navigation.navigate("signin");
  }

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
        <JobLists />
        <Packages />

        <Button title="Logout" color="error" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
