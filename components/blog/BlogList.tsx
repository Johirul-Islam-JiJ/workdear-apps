import { Blog } from "@/types/blog";
import React from "react";
import { View } from "react-native";
import { ThemedText } from "../libs/ThemedText";
import BlogCard from "./BlogCard";
import BlogLoadingCard from "./BlogLoadingCard";

type Props = {
  blogs: Blog[];
  isLoading: boolean;
};

const BlogList = ({ blogs, isLoading }: Props) => {
  if (isLoading)
    return (
      <View style={{ rowGap: 5, marginTop: 10 }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <BlogLoadingCard key={index} />
        ))}
      </View>
    );

  if (blogs.length === 0)
    return (
      <View>
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <ThemedText color="gray.800" darkColor="gray.300" variant="body">
            No blog found
          </ThemedText>
        </View>
      </View>
    );

  return (
    <View style={{ rowGap: 5, marginTop: 10 }}>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </View>
  );
};

export default BlogList;
