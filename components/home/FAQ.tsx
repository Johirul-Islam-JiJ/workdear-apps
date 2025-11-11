import { useGetFaqContentQuery } from "@/store/features/content";
import { Faq } from "@/types/Faq";
import React from "react";
import { View } from "react-native";
import { ThemedText } from "../libs/ThemedText";
import FaqList from "./FaqList";

const FAQ = () => {
  const { data } = useGetFaqContentQuery();
  const faqData: Faq[] = data?.faq_data ?? [];

  return (
    <View>
      <ThemedText variant="subtitle" color="primarydark" darkColor="white">
        Frequently Asked Questions
      </ThemedText>

      <View style={{ rowGap: 8, marginTop: 10 }}>
        {faqData.slice(0, 5).map((item, index) => (
          <FaqList key={index} item={item} />
        ))}
      </View>
    </View>
  );
};

export default FAQ;
