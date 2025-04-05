import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

interface ArticleCardProps {
  slug: string; // Add slug prop
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  tags: string[];
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  slug, // Destructure slug
  title,
  excerpt,
  date,
  readTime,
  category,
  imageUrl,
  tags,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Function to generate slug (simple example, might need more robust logic)
  const generateSlug = (title: string) => {
      return title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-'); // Replace multiple hyphens with single
  };
  
  // Use provided slug or generate one if needed (though it should come from props)
  const articleSlug = slug || generateSlug(title);

  return (
    <Link 
      to={`/blog/${articleSlug}`} // Link to the article page using slug
      className="group block relative bg-dark-card/30 rounded-3xl overflow-hidden transform-gpu transition-all duration-500 hover:scale-[1.02] hover:bg-dark-card/50 focus:outline-none focus:ring-2 focus:ring-purple-primary focus:ring-offset-2 focus:ring-offset-dark-background"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Read more about ${title}`}
    >
      {/* Removed the outer <article> tag as Link serves as the container */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-background/50 to-dark-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Category Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="px-4 py-1 rounded-full bg-purple-primary/20 text-purple-primary text-sm backdrop-blur-sm">
          {category}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform-gpu transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-background to-transparent" />
      </div>

      {/* Content */}
      <div className="relative p-6">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-text-tertiary text-sm mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-text-primary mb-3 line-clamp-2 group-hover:text-purple-primary transition-colors duration-300">
          {title}
        </h2>

        {/* Excerpt */}
        <p className="text-text-secondary mb-6 line-clamp-3">
          {excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-dark-modal/30 text-text-tertiary text-sm hover:bg-dark-modal/50 transition-colors duration-300"
            >
              <Tag className="w-3 h-3 inline-block mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Read More Indicator (visual cue, link is on the whole card) */}
        <div className="flex items-center gap-2 text-purple-primary group-hover:text-purple-300 transition-colors duration-300 mt-auto pt-4">
          <span className="font-medium">Read More</span>
          <ArrowRight className="w-4 h-4 transform-gpu transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Hover Effect Border (applied to Link container) */}
      <div 
        className={`absolute inset-0 border-2 border-purple-primary/0 rounded-3xl transition-all duration-500 ${
          isHovered ? 'border-purple-primary/50 scale-[0.98]' : 'scale-100'
        }`}
        aria-hidden="true" 
      />
    </Link> // Close Link tag
  );
};

export default ArticleCard;
