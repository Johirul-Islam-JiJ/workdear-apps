import React from "react";
import { View } from "react-native";
import Button from "../libs/Button";
import OtpInput from "../libs/OtpInput";

const OtpForm = () => {
  return (
    <View style={{ gap: 20, padding: 10, paddingTop: 20 }}>
      <OtpInput />
      <Button title="Verify" />
    </View>
  );
};

export default OtpForm;
