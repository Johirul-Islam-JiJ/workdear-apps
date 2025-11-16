import ContentRenderer from "@/components/libs/ContentRenderer";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { ThemedView } from "@/components/libs/ThemedView";
import { useGetTermsAndConditionsQuery } from "@/store/features/content";
import React from "react";
import { ScrollView, View } from "react-native";

const TermsAndCondition = () => {
  const { data, isLoading } = useGetTermsAndConditionsQuery();

  if (isLoading) return <LoadingIndicator fullScreen />;

  const content: string = data?.content_data?.content;
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 10 }}>
          <ContentRenderer html={content} />
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default TermsAndCondition;
