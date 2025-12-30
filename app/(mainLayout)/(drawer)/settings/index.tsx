import Container from "@/components/common/Container";
import AccountDeactivation from "@/components/setting/AccountDeactivation";
import AccountPassword from "@/components/setting/AccountPassword";
import EditProfile from "@/components/setting/EditProfile";
import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Settings = () => {
  return (
    <Container>
      <KeyboardAwareScrollView>
        <View style={{ rowGap: 10 }}>
          <EditProfile />
          <AccountPassword />
          <AccountDeactivation />
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Settings;
