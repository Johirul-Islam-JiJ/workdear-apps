import { useGetFaqContentQuery } from "@/store/features/content";
import { Faq } from "@/types/Faq";
import React from "react";
import { View } from "react-native";
import Collupsable from "../libs/Collupsable";
import ContentRenderer from "../libs/ContentRenderer";
import { ThemedText } from "../libs/ThemedText";

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
          <Collupsable
            key={index}
            title={item.question}
            description={<ContentRenderer html={item.answer} />}
          />
        ))}
      </View>
    </View>
  );
};

export default FAQ;
