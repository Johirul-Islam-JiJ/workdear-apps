export interface BlogCategory {
  id: number;
  category_name: string;
  created_at: string;
  deleted_at: null;
  updated_at: string;
}

export interface Blog {
  content: string;
  created_at: string;
  id: number;
  job_category: BlogCategory;
  job_category_id: number;
  keywords: string[];
  published_at: string;
  short_description: string;
  slug: string;
  tag_line: null;
  thumbnail_image: string;
  title: string;
  updated_at: string;
}
