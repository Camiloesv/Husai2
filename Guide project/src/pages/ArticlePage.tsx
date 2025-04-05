import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase, ArticleFromSupabase } from '../lib/supabaseClient';
import { marked } from 'marked';
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import Card from '../components/ui/Card';

interface ArticleDisplayData {
  title: string;
  content: string;
  date: string;
  category: string;
  imageUrl?: string;
  tags?: string[];
  author?: {
    name: string;
    avatar: string;
  };
  readTime?: string;
}

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleDisplayData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticleData = async () => {
      if (!slug) {
        setError('Article slug is missing.');
        setIsLoading(false);
        return;
      }

      try {
        const { data, error: supabaseError } = await supabase
          .from('articles')
          .select<`*`, ArticleFromSupabase>('*')
          .eq('slug', slug)
          .single();

        if (supabaseError) {
          if (supabaseError.code === 'PGRST116') {
            setError('Article not found.');
          } else {
            throw supabaseError;
          }
        }

        if (data) {
          setArticle({
            title: data.title,
            content: data.content || '',
            date: new Date(data.created_at).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            }),
            category: data.category,
            imageUrl: data.image_url,
            tags: data.tags || [],
            author: {
              name: 'Husai Team',
              avatar: '/husai_logo_svg.svg', // ruta desde public/
            },
            readTime: data.read_time || '5 min read',
          });          
        } else if (!supabaseError) {
          setError('Article not found.');
        }
      } catch (err: any) {
        console.error(`Error fetching article with slug ${slug}:`, err);
        setError(err.message || 'Failed to fetch article.');
      } finally {
        setIsLoading(false);
        setTimeout(() => setShowContent(true), 100);
      }
    };

    fetchArticleData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto animate-pulse py-20">
        <div className="h-96 bg-dark-card/30 rounded-3xl mb-8" />
        <div className="space-y-4">
          <div className="h-8 bg-dark-card/30 rounded w-3/4" />
          <div className="h-4 bg-dark-card/30 rounded w-1/2" />
          <div className="h-4 bg-dark-card/30 rounded w-full" />
          <div className="h-4 bg-dark-card/30 rounded w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  if (!article) {
    return <div className="text-center py-20 text-text-secondary">Article not found.</div>;
  }

  return (
    <div className={`max-w-4xl mx-auto transition-all duration-1000 px-4 py-12 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <button
        onClick={() => navigate('/blog')}
        className="flex items-center gap-2 text-text-tertiary hover:text-purple-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
        Back to Articles
      </button>

      {article.imageUrl && (
        <div className="relative h-[500px] rounded-3xl overflow-hidden mb-12">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-background via-transparent to-transparent" />
        </div>
      )}

      <Card className="p-8 mb-12">
        {article.author && (
          <div className="flex items-center gap-4 mb-6">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-text-primary font-medium">{article.author.name}</h3>
              <div className="flex items-center gap-4 text-text-tertiary text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <h1 className="text-4xl font-bold text-text-primary mb-6">{article.title}</h1>

        <div className="flex flex-wrap items-center gap-4">
          <span className="px-4 py-1 rounded-full bg-purple-primary/20 text-purple-primary text-sm">
            {article.category}
          </span>
          {article.tags?.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-dark-modal/30 text-text-tertiary text-sm"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
          <button className="ml-auto flex items-center gap-2 text-text-tertiary hover:text-purple-primary transition-colors">
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>
      </Card>

      <Card className="p-8 mb-12 prose prose-invert max-w-none">
        <div
          dangerouslySetInnerHTML={{ __html: marked.parse(article.content) }}
          className="text-text-secondary leading-relaxed"
        />
      </Card>
    </div>
  );
};

export default ArticlePage;
