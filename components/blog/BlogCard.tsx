import { Blog } from "@/types/blog";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import AppIcon from "../libs/AppIcon";
import Button from "../libs/Button";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <Card>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <AppIcon size={16} color="primarylight">
          <Ionicons name="receipt-outline" />
        </AppIcon>
        <ThemedText color="primarylight">
          {blog.job_category?.category_name}
        </ThemedText>
      </View>
      <ThemedText
        numberOfLines={1}
        lineBreakMode="tail"
        style={{ fontWeight: "bold" }}
      >
        {blog.title}
      </ThemedText>
      <ThemedText>{blog.short_description}</ThemedText>
      <ThemedText darkColor="gray.300" color="gray.600" variant="small">
        Published on:{" "}
        {new Date(blog.created_at).toLocaleDateString("en-BN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </ThemedText>
      <Link asChild href={`/blogs/${blog.slug}`}>
        <Button title="Read More" />
      </Link>
    </Card>
  );
};

export default BlogCard;
