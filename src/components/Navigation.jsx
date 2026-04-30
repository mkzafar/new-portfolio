import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Home, Github, Linkedin } from 'lucide-react';

export default function Navigation({ currentPage, onPageChange }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  const handlePageChange = (pageId) => {
    onPageChange(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-lg border-b border-slate-300/40"
        style={{ background: "rgba(224, 218, 205, 0.92)" }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Brand / Home */}
            <button
              onClick={() => onPageChange('landing')}
              className="flex items-center gap-2 text-2xl font-bold text-slate-900 hover:text-slate-600 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-md"
            >
              <Home className="w-6 h-6 group-hover:scale-110 transition-transform" />
              MZ
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  isActive={currentPage === item.id}
                  onClick={() => handlePageChange(item.id)}
                />
              ))}

              {/* Socials on the far right */}
              <div className="ml-3 pl-3 flex items-center gap-2 border-l border-slate-200">
                <a
                  href="https://github.com/mkzafar"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mkzafar23/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed top-[72px] left-0 right-0 z-40 border-b border-slate-300/40 shadow-lg md:hidden"
          style={{ background: "rgba(224, 218, 205, 0.97)" }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`text-left px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive
                      ? 'text-slate-900 bg-slate-100'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Socials on mobile */}
            <div className="flex items-center gap-6 pt-2">
              <a
                href="https://github.com/mkzafar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/mkzafar23/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
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

function NavItem({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        'relative group px-4 py-2 font-medium rounded-md',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        isActive ? 'text-slate-900' : 'text-slate-700 hover:text-slate-900'
      ].join(' ')}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="relative z-10">{label}</span>

      {/* Top line */}
      <span
        className={[
          'pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-slate-700 rounded',
          'opacity-0 -translate-y-[6px] scale-x-0 origin-center',
          'transition-all duration-200 ease-out',
          'group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-x-100',
        ].join(' ')}
      />

      {/* Bottom line */}
      <span
        className={[
          'pointer-events-none absolute left-0 right-0 bottom-0 h-[2px] bg-slate-700 rounded',
          'transition-all duration-200 ease-out',
          isActive
            ? 'opacity-100 translate-y-0 scale-x-100'
            : 'opacity-0 translate-y-[6px] scale-x-0 origin-center group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-x-100'
        ].join(' ')}
      />
    </button>
  );
}