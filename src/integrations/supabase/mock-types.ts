
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
        Relationships: []
      }
      blog_categories: {
        Row: {
          id: string
          created_at: string | null
          name: string
          description: string | null
          slug: string
        }
        Insert: {
          id?: string
          created_at?: string | null
          name: string
          description?: string | null
          slug: string
        }
        Update: {
          id?: string
          created_at?: string | null
          name?: string
          description?: string | null
          slug?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          created_at: string | null
          author_id: string | null
          category_id: string | null
          title: string
          slug: string
          summary: string | null
          content: string
          featured_image: string | null
          status: string
          published_at: string | null
          updated_at: string | null
          seo_title: string | null
          seo_description: string | null
          seo_keywords: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          author_id?: string | null
          category_id?: string | null
          title: string
          slug: string
          summary?: string | null
          content: string
          featured_image?: string | null
          status?: string
          published_at?: string | null
          updated_at?: string | null
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          author_id?: string | null
          category_id?: string | null
          title?: string
          slug?: string
          summary?: string | null
          content?: string
          featured_image?: string | null
          status?: string
          published_at?: string | null
          updated_at?: string | null
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      blog_posts_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "blog_tags"
            referencedColumns: ["id"]
          }
        ]
      }
      blog_tags: {
        Row: {
          id: string
          created_at: string | null
          name: string
          slug: string
        }
        Insert: {
          id?: string
          created_at?: string | null
          name: string
          slug: string
        }
        Update: {
          id?: string
          created_at?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          role: string | null
          avatar_url: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          role?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          role?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      site_settings: {
        Row: {
          id: string
          company_name: string
          company_description: string | null
          logo_url: string | null
          primary_color: string | null
          secondary_color: string | null
          contact_email: string | null
          contact_phone: string | null
          address: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          company_name: string
          company_description?: string | null
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          address?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          company_name?: string
          company_description?: string | null
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          address?: string | null
          updated_at?: string | null
        }
        Relationships: []
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
  auth: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
        }
      }
    }
  }
}
