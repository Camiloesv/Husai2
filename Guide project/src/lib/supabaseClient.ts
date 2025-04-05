import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and Anon Key
// It's recommended to use environment variables for these in production
const supabaseUrl = 'https://kkzibcveuqktqxecjeho.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtremliY3ZldXFrdHF4ZWNqZWhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0Mzk2OTUsImV4cCI6MjA1OTAxNTY5NX0.Mjn0A7wosR7L9vysWfZcI1yNAe7IH6ueQf5Bd2uqKYo';

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
