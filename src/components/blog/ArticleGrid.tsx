import React, { useState, useEffect } from 'react';
import { Filter, Search } from 'lucide-react';
import ArticleCard from './ArticleCard';
import { supabase } from '../../lib/supabaseClient'; // Import Supabase client

// Keep this interface for the component's internal use
interface Article {
  id: string; 
  slug: string; // Add slug field
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string; // Use camelCase consistent with ArticleCard
  tags: string[];
  // readTime: string; // Keep camelCase - REMOVED DUPLICATE
}

// Define a type matching Supabase table structure (if not already imported)
interface ArticleFromSupabase {
  id: string; 
  created_at: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string; // Optional if not needed for grid
  category: string;
  image_url: string; // Snake_case from Supabase
  read_time: string; // Snake_case from Supabase
  tags: string[]; 
}

const ArticleGrid: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Assuming your table is named 'articles'
        // Specify the type in the select method
        const { data, error: supabaseError } = await supabase
          .from('articles') 
          .select<`*`, ArticleFromSupabase>('*') // Select all columns and specify type
          .order('created_at', { ascending: false }); // Order by creation date

        if (supabaseError) {
          throw supabaseError;
        }

        if (data) {
          // Map Supabase data (snake_case) to component data (camelCase)
          const formattedArticles: Article[] = data.map(article => ({
            id: article.id,
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            // Format date if needed, otherwise use created_at or a dedicated date column
            date: new Date(article.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', month: 'short', day: 'numeric' 
            }), 
            readTime: article.read_time, // Map read_time
            category: article.category,
            imageUrl: article.image_url, // Map image_url
            tags: article.tags || [], // Handle potential null tags
          }));
          setArticles(formattedArticles);
        }
      } catch (err: any) {
        console.error('Error fetching articles:', err);
        setError(err.message || 'Failed to fetch articles.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []); // Empty dependency array means this runs once on mount

  // Dynamically generate categories from fetched articles
  const categories = ['all', ...new Set(articles.map(article => article.category))];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-dark-background p-8">
      {/* Filters Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-stretch md:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-dark-card/30 border border-dark-border/20 rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-purple-primary/50 transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0">
            <Filter className="w-5 h-5 text-text-tertiary flex-shrink-0" />
            <div className="flex gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-purple-primary text-white'
                      : 'bg-dark-card/30 text-text-tertiary hover:bg-dark-card/50'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {isLoading ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-[500px] bg-dark-card/30 rounded-3xl" />
          ))}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              {...article} // Pass mapped article data
            />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
         <div className="text-center py-12 text-red-500">
           <p>Error loading articles: {error}</p>
         </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-tertiary text-lg">No articles found matching your criteria.</p>
          {/* Optionally suggest checking Supabase if articles array is empty */}
          {articles.length === 0 && <p className="text-sm text-text-tertiary mt-2">(No articles found in the database)</p>}
        </div>
      )}
    </div>
  );
};

export default ArticleGrid;
