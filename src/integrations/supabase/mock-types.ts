
/**
 * This is a temporary mock file to help with compilation.
 * Please replace with proper types generated from Supabase CLI.
 * 
 * See src/scripts/generate-supabase-types.js for instructions.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      analytics: {
        Row: {
          id: string
          date: string
          page_views: number | null
          unique_visitors: number | null
          bounce_rate: number | null
          avg_session_duration: number | null
          source: string | null
        }
        Insert: {
          id?: string
          date: string
          page_views?: number | null
          unique_visitors?: number | null
          bounce_rate?: number | null
          avg_session_duration?: number | null
          source?: string | null
        }
        Update: {
          id?: string
          date?: string
          page_views?: number | null
          unique_visitors?: number | null
          bounce_rate?: number | null
          avg_session_duration?: number | null
          source?: string | null
        }
      }
      blog_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string | null
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          summary: string | null
          content: string
          featured_image: string | null
          author_id: string | null
          status: string
          category_id: string | null
          published_at: string | null
          created_at: string | null
          updated_at: string | null
          seo_title: string | null
          seo_description: string | null
          seo_keywords: string | null
          profiles?: { full_name: string | null }
          blog_categories?: { name: string, slug: string | null }
        }
        Insert: {
          id?: string
          title: string
          slug: string
          summary?: string | null
          content: string
          featured_image?: string | null
          author_id?: string | null
          status?: string
          category_id?: string | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          summary?: string | null
          content?: string
          featured_image?: string | null
          author_id?: string | null
          status?: string
          category_id?: string | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
        }
      }
      blog_posts_tags: {
        Row: {
          post_id: string
          tag_id: string
          blog_tags?: { id: string, name: string, slug: string }
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
      }
      blog_tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string | null
          updated_at?: string | null
        }
      }
      site_settings: {
        Row: {
          id: string
          company_name: string
          company_description: string | null
          contact_email: string | null
          contact_phone: string | null
          address: string | null
          logo_url: string | null
          primary_color: string | null
          secondary_color: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          company_name: string
          company_description?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          address?: string | null
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          company_name?: string
          company_description?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          address?: string | null
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
