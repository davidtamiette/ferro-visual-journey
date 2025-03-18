
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  featured_image: string | null;
  author_id: string;
  status: 'draft' | 'published' | 'archived';
  category_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  // Additional fields from join queries
  author_name?: string;
  category_name?: string;
  tags?: Tag[];
  // Fields that might come from Supabase joins
  profiles?: { full_name: string };
  blog_categories?: { name: string; slug?: string };
}

export interface PostFormData {
  title: string;
  slug: string;
  summary: string;
  content: string;
  featured_image: string | null;
  status: 'draft' | 'published' | 'archived';
  category_id: string | null;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  tags: string[];
}
