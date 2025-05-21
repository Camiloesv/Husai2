import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// Section components (relative paths – no alias)
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import CaseStudies from '../components/sections/CaseStudies';
import Contact from '../components/sections/Contact';

/**
 * Combines the main marketing sections seen on the root path.
 * Adjust order / add new sections as needed.
 */
export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('landingPage.title')}</title>
        <meta name="description" content={t('landingPage.description')} />
        <meta name="keywords" content={t('landingPage.keywords')} />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={t('landingPage.title')} />
        <meta property="og:description" content={t('landingPage.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="[current_page_url]" /> {/* Replace with actual URL */}
        <meta property="og:image" content="/husai_logo_with_white_circle.svg" /> {/* Use the logo */}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('landingPage.title')} />
        <meta name="twitter:description" content={t('landingPage.description')} />
        <meta name="twitter:image" content="/husai_logo_with_white_circle.svg" /> {/* Use the logo */}
      </Helmet>
      <Hero />
      <Services />
      <CaseStudies />
      <Contact />
    </>
  );
}
