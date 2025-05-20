import React from 'react';

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
  return (
    <>
      <Hero />
      <Services />
      <CaseStudies />
      <Contact />
    </>
  );
}
