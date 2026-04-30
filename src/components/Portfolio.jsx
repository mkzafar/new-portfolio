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

  const grainBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E")`;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#e6e1d3",
        backgroundImage: grainBg,
        backgroundRepeat: "repeat",
        backgroundSize: "250px",
      }}
    >
      <AnimatePresence mode="wait">
        {currentPage === 'landing' && (
          <LandingPage onEnter={handleEnterFromLanding} />
        )}
      </AnimatePresence>
      {/* Scroll target so the landing page scroll listener fires on wheel/swipe */}
      {currentPage === 'landing' && (
        <div style={{ height: "200vh" }} aria-hidden />
      )}

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
          <footer className="py-8" style={{ background: "#2a2a20", color: "white" }}>
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