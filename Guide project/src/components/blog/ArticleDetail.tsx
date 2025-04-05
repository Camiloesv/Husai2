import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';

interface ArticleDetailProps {
  id: string;
}

interface Article {
  id: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ id }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setArticle({
        id,
        title: "The Future of AI in Enterprise Solutions",
        content: `
          <p class="mb-6">
            Artificial Intelligence is revolutionizing the way enterprises operate, making processes more efficient and enabling data-driven decision making at unprecedented scales. As we move forward into an increasingly digital future, the role of AI in shaping business operations becomes more crucial than ever.
          </p>
          
          <h2 class="text-2xl font-bold mb-4">The Current Landscape</h2>
          <p class="mb-6">
            Today's enterprises are facing unique challenges in implementing AI solutions. From data privacy concerns to integration with legacy systems, organizations must navigate a complex landscape of technical and operational considerations.
          </p>
          
          <h2 class="text-2xl font-bold mb-4">Key Benefits</h2>
          <ul class="list-disc list-inside mb-6 space-y-2">
            <li>Enhanced operational efficiency through automation</li>
            <li>Improved decision-making with predictive analytics</li>
            <li>Better customer experiences through personalization</li>
            <li>Reduced costs and increased productivity</li>
          </ul>
          
          <h2 class="text-2xl font-bold mb-4">Looking Ahead</h2>
          <p class="mb-6">
            The future of AI in enterprise solutions looks promising, with emerging technologies like federated learning and explainable AI addressing current limitations and opening new possibilities for business applications.
          </p>
        `,
        date: "Mar 15, 2024",
        readTime: "5 min read",
        category: "Artificial Intelligence",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
        tags: ["AI", "Enterprise", "Technology", "Innovation"],
        author: {
          name: "Sarah Johnson",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
        }
      });
      
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 100);
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto animate-pulse">
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

  if (!article) return null;

  return (
    <div className={`max-w-4xl mx-auto transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/blog')}
        className="flex items-center gap-2 text-text-tertiary hover:text-purple-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
        Back to Articles
      </button>

      {/* Hero Image */}
      <div className="relative h-[500px] rounded-3xl overflow-hidden mb-12">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-background via-transparent to-transparent" />
      </div>

      {/* Article Header */}
      <Card className="p-8 mb-12">
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

        <h1 className="text-4xl font-bold text-text-primary mb-6">{article.title}</h1>

        <div className="flex flex-wrap items-center gap-4">
          <span className="px-4 py-1 rounded-full bg-purple-primary/20 text-purple-primary text-sm">
            {article.category}
          </span>
          {article.tags.map((tag, index) => (
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

      {/* Article Content */}
      <Card className="p-8 mb-12 prose prose-invert max-w-none">
        <div 
          dangerouslySetInnerHTML={{ __html: article.content }}
          className="text-text-secondary leading-relaxed"
        />
      </Card>
    </div>
  );
};

export default ArticleDetail;