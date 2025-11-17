import React from "react";
import { View } from "react-native";
import Banner from "./Banner";
import ChatButton from "./ChatButton";
import SupportNumbers from "./SupportNumbers";

const ContactUsContent = () => {
  return (
    <View>
      <Banner />
      <SupportNumbers />
      <ChatButton />
    </View>
  );
};

export default ContactUsContent;
