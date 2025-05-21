import React from 'react';
import { Helmet } from 'react-helmet-async';
import ArticleGrid from '../components/blog/ArticleGrid';
import { useText } from '../hooks/useText'; // Ajusta si tu ruta es distinta
import { useTranslation } from 'react-i18next';

const Blog: React.FC = () => {
  const { blog } = useText();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-dark-background">
      <Helmet>
        <title>{t('blog.title')}</title>
        <meta name="description" content={t('blog.description')} />
        <meta name="keywords" content={t('blog.keywords')} />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={t('blog.title')} />
        <meta property="og:description" content={t('blog.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="[current_page_url]" /> {/* Replace with actual URL */}
        <meta property="og:image" content="/husai_logo_with_white_circle.svg" /> {/* Use the logo */}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('blog.title')} />
        <meta name="twitter:description" content={t('blog.description')} />
        <meta name="twitter:image" content="/husai_logo_with_white_circle.svg" /> {/* Use the logo */}
      </Helmet>
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
