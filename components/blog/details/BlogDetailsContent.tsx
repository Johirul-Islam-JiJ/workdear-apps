import AppIcon from "@/components/libs/AppIcon";
import ContentRenderer from "@/components/libs/ContentRenderer";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { ThemedText } from "@/components/libs/ThemedText";
import { config } from "@/config/config";
import { useGetBlogBySlugQuery } from "@/store/features/blogs";
import { Blog } from "@/types/blog";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Dimensions, View } from "react-native";

const BlogDetailsContent = ({ slug }: { slug: string }) => {
  const { data: blogResponse, isLoading } = useGetBlogBySlugQuery(slug);

  if (isLoading)
    return (
      <LoadingIndicator
        fullScreen
        style={{ height: Dimensions.get("screen").height - 100 }}
      />
    );
  const blog: Blog = blogResponse?.data;

  return (
    <View style={{ rowGap: 10, padding: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <AppIcon size={16} color="primarylight">
          <Ionicons name="receipt-outline" />
        </AppIcon>
        <ThemedText color="primarylight">
          {blog.job_category.category_name}
        </ThemedText>
      </View>
      <View>
        <ThemedText style={{ fontWeight: "bold" }}>{blog.title}</ThemedText>
        <ThemedText darkColor="gray.300" color="gray.600" variant="small">
          Published on:{" "}
          {new Date(blog.created_at).toLocaleDateString("en-BN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </ThemedText>
      </View>
      <Image
        source={{ uri: config.fileBaseUrl + blog.thumbnail_image }}
        style={{ width: "100%", height: 200, borderRadius: 5 }}
      />
      <ContentRenderer html={blog.content} />
    </View>
  );
};

export default BlogDetailsContent;
