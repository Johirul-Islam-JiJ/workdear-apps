import Container from "@/components/common/Container";
import AccountDeactivation from "@/components/setting/AccountDeactivation";
import AccountPassword from "@/components/setting/AccountPassword";
import EditProfile from "@/components/setting/EditProfile";
import React, { useEffect, useState } from "react";
import { Keyboard, View } from "react-native";

const Settings = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Container>
      <View style={{ rowGap: 10, marginBottom: keyboardHeight }}>
        <EditProfile />
        <AccountPassword />
        <AccountDeactivation />
      </View>
    </Container>
  );
};

export default Settings;
