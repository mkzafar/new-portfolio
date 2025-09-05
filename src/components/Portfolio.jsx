import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LandingPage from "./LandingPage";
import Navigation from "./Navigation";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import ExperienceSection from "./ExperienceSection";
import ContactSection from "./ContactSection";

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState('landing');

  // Handle scroll on landing page
  useEffect(() => {
    if (currentPage === 'landing') {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setCurrentPage('about');
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [currentPage]);

  // Reset scroll position when changing pages (except landing)
  useEffect(() => {
    if (currentPage !== 'landing') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const handleEnterFromLanding = () => {
    setCurrentPage('about');
  };

  const handlePageChange = (pageId) => {
    if (pageId === 'landing') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentPage(pageId);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutSection key="about" />;
      case 'projects':
        return <ProjectsSection key="projects" />;
      case 'experience':
        return <ExperienceSection key="experience" />;
      case 'contact':
        return <ContactSection key="contact" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {currentPage === 'landing' && (
          <LandingPage onEnter={handleEnterFromLanding} />
        )}
      </AnimatePresence>

      {currentPage !== 'landing' && (
        <>
          <Navigation 
            currentPage={currentPage} 
            onPageChange={handlePageChange}
          />
          <main className="pt-20"> {/* Offset for fixed nav */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {renderCurrentPage()}
              </motion.div>
            </AnimatePresence>
          </main>
          
          {/* Footer */}
          <footer className="bg-slate-900 text-white py-8">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <p className="text-slate-400">
                © 2024 Muhammad Zafar. All rights reserved.
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}