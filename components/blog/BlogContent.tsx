import { useDebouncer } from "@/hooks/useDebouncer";
import {
  useGetBlogCategoriesQuery,
  useGetBlogsQuery,
} from "@/store/features/blogs";
import { Blog, BlogCategory } from "@/types/blog";
import React, { useState } from "react";
import { View } from "react-native";
import Pagination from "../libs/Pagination";
import BlogList from "./BlogList";
import Categories from "./Categories";
import SearchBar from "./SearchBar";

const BlogContent = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | number>("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const searchValue = useDebouncer(search);
  const { data: blogsResponse, isLoading } = useGetBlogsQuery({
    page,
    job_category_id: selectedCategory,
    search: searchValue,
  });
  const { data: categoriesResponse, isLoading: loadingCategory } =
    useGetBlogCategoriesQuery(undefined);

  const categories: BlogCategory[] = categoriesResponse?.data ?? [];
  const blogData = blogsResponse?.data;
  const blogs: Blog[] = blogData?.data ?? [];

  return (
    <View style={{ padding: 10, rowGap: 10 }}>
      <SearchBar value={search} onChange={setSearch} />
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <BlogList blogs={blogs} />
      <Pagination
        currentPage={page}
        totalPages={blogData?.last_page || 1}
        onChange={setPage}
      />
    </View>
  );
};

export default BlogContent;
