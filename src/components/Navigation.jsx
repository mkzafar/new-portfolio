import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Github, Linkedin } from 'lucide-react';

export default function Navigation({ currentPage, onPageChange }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // New order: about, experience, projects, resume, contact
  const navItems = [
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Resume", id: "resume" },
    { label: "Contact", id: "contact" },
  ];

  const handlePageChange = (pageId) => {
    onPageChange(pageId);
    setIsMobileMenuOpen(false);
  };

  const baseLink =
    "px-6 py-2 font-medium transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white";
  const inactive = "text-slate-600 hover:text-blue-600 hover:bg-blue-50";
  const active   = "!text-slate-900";

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Brand / Home */}
            <button
              onClick={() => onPageChange('landing')}
              className="flex items-center gap-2 text-2xl font-bold text-slate-900 hover:text-blue-600 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-md"
            >
              <Home className="w-6 h-6 group-hover:scale-110 transition-transform" />
              MZ
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handlePageChange(item.id)}
                    className={`${baseLink} ${isActive ? active : inactive}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Social icons on the far right */}
              <div className="ml-3 pl-3 flex items-center gap-2 border-l border-slate-200">
                <a
                  href="https://github.com/mkzafar"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white pointer-events-auto"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mkzafar23/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white pointer-events-auto"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden border-0 bg-transparent hover:bg-transparent shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-[60] bg-white md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <button
              onClick={() => handlePageChange('landing')}
              className="flex items-center gap-3 text-2xl font-medium text-slate-700 hover:text-blue-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-md px-3 py-2"
            >
              <Home className="w-6 h-6" />
              Home
            </button>

            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`text-2xl font-medium transition-colors px-3 py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    isActive ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Socials on mobile */}
            <div className="flex items-center gap-6 pt-2 pointer-events-auto">
              <a
                href="https://github.com/mkzafar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition pointer-events-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/mkzafar23/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition pointer-events-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}