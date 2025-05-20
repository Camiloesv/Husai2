import React from 'react';
import ArticleGrid from '../components/blog/ArticleGrid';
import { useText } from '../hooks/useText'; // Ajusta si tu ruta es distinta

const Blog: React.FC = () => {
  const { blog } = useText();

  return (
    <div className="min-h-screen bg-dark-background">
      {/* Header */}
      <header className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-primary/10 to-dark-background" />

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-primary/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-0 right-1/4 w-64 h-64 bg-status-info/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '-2s' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
            {blog.title}
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl">
            {blog.subtitle}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <ArticleGrid />
      </main>
    </div>
  );
};

export default Blog;
