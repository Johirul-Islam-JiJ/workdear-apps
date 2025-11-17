import { config } from "@/config/config";
import { api } from "./baseQuery";

export const blogsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: ({ page, job_category_id, search }) => ({
        url: `/blog?paginate=${config.dataLimit}&page=${page}&job_category_id=${job_category_id}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),
    getBlogCategories: builder.query({
      query: () => ({
        url: "/blog/categories",
        method: "GET",
      }),
      providesTags: ["blogs-categories"],
    }),
    getBlogBySlug: builder.query({
      query: (slug) => ({
        url: `/blog/${slug}`,
        method: "GET",
      }),
      providesTags: ["single-blogs"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogCategoriesQuery,
  useGetBlogBySlugQuery,
} = blogsApi;
