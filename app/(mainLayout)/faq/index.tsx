import FaqList from "@/components/home/FaqList";
import { ThemedView } from "@/components/libs/ThemedView";
import { useGetFaqContentQuery } from "@/store/features/content";
import { Faq } from "@/types/Faq";
import React from "react";
import { ScrollView, View } from "react-native";

const FaqScreen = () => {
  const { data } = useGetFaqContentQuery();
  const faqData: Faq[] = data?.faq_data ?? [];

  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ rowGap: 8, padding: 10 }}>
          {faqData.map((item, index) => (
            <FaqList key={index} item={item} />
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default FaqScreen;
