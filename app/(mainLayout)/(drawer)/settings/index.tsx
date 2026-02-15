import Container from "@/components/common/Container";
import AccountDeactivation from "@/components/setting/AccountDeactivation";
import AccountPassword from "@/components/setting/AccountPassword";
import EditProfile from "@/components/setting/EditProfile";
import EditProfileImage from "@/components/setting/EditProfileImage";
import useKeyboardHeight from "@/hooks/useKeyboardHeight";
import React from "react";
import { View } from "react-native";

const Settings = () => {
  const keyboardHeight = useKeyboardHeight();

  return (
    <Container>
      <View style={{ rowGap: 10, marginBottom: keyboardHeight }}>
        <EditProfileImage />
        <EditProfile />
        <AccountPassword />
        <AccountDeactivation />
      </View>
    </Container>
  );
};

export default Settings;
