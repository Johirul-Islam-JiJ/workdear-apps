import ContactUsContent from "@/components/contactus/ContactUsContent";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";
import { ScrollView } from "react-native";

const ContactUs = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <ContactUsContent />
      </ScrollView>
    </ThemedView>
  );
};

export default ContactUs;
