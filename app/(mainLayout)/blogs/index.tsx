import BlogContent from "@/components/blog/BlogContent";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";
import { ScrollView } from "react-native";

const Blog = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <BlogContent />
      </ScrollView>
    </ThemedView>
  );
};

export default Blog;
