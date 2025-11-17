import BlogDetailsContent from "@/components/blog/details/BlogDetailsContent";
import { ThemedView } from "@/components/libs/ThemedView";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

const SingleBlog = () => {
  const { slug } = useLocalSearchParams();
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <BlogDetailsContent slug={slug as string} />
      </ScrollView>
    </ThemedView>
  );
};

export default SingleBlog;
