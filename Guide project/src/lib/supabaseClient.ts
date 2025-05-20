import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and Anon Key
// It's recommended to use environment variables for these in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Optional: Define a type for your article data based on your table structure
export interface ArticleFromSupabase {
  id: string; // Or number, depending on your primary key type
  created_at: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Assuming full content is stored here
  category: string;
  image_url: string; // Ensure column name matches
  read_time: string; // Ensure column name matches
  tags: string[]; // Assuming tags are stored as an array of text
  // Add any other columns you have
}
