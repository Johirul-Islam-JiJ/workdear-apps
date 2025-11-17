import { Blog } from "@/types/blog";
import React from "react";
import { View } from "react-native";
import BlogCard from "./BlogCard";

const BlogList = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <View style={{ rowGap: 5, marginTop: 10 }}>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </View>
  );
};

export default BlogList;
