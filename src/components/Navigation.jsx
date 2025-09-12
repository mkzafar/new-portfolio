import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Github, Linkedin } from 'lucide-react';

export default function Navigation({ currentPage, onPageChange }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Resume', id: 'resume' },
    { label: 'Contact', id: 'contact' },
  ];

  const handlePageChange = (pageId) => {
    onPageChange(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
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
                    isActive ? 'text-blue-700 underline underline-offset-8 decoration-2' : 'text-slate-700 hover:text-blue-600'
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
                className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/mkzafar23/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
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
      {/* Label */}
      <span className="relative z-10">{label}</span>

      {/* TOP line (drops down) */}
      <span
        className={[
          'pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-blue-600 rounded',
          'opacity-0 -translate-y-[6px] scale-x-0 origin-center',
          'transition-all duration-200 ease-out',
          'group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-x-100',
          'group-focus-visible:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-x-100'
        ].join(' ')}
      />

      {/* BOTTOM line (rises up) — stays visible if active */}
      <span
        className={[
          'pointer-events-none absolute left-0 right-0 bottom-0 h-[2px] bg-blue-600 rounded',
          'transition-all duration-200 ease-out',
          isActive
            ? 'opacity-100 translate-y-0 scale-x-100'
            : 'opacity-0 translate-y-[6px] scale-x-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-x-100 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-x-100'
        ].join(' ')}
      />

      {/* RIGHT side (draws upward from bottom) */}
      <span
        className={[
          'pointer-events-none absolute right-0 top-0 bottom-0 w-[2px] bg-blue-600 rounded',
          'opacity-0 scale-y-0 origin-bottom',
          'transition-transform duration-200 ease-out delay-150',
          'group-hover:opacity-100 group-hover:scale-y-100',
          'group-focus-visible:opacity-100 group-focus-visible:scale-y-100'
        ].join(' ')}
      />

      {/* LEFT side (draws downward from top) */}
      <span
        className={[
          'pointer-events-none absolute left-0 top-0 bottom-0 w-[2px] bg-blue-600 rounded',
          'opacity-0 scale-y-0 origin-top',
          'transition-transform duration-200 ease-out delay-150',
          'group-hover:opacity-100 group-hover:scale-y-100',
          'group-focus-visible:opacity-100 group-focus-visible:scale-y-100'
        ].join(' ')}
      />
    </button>
  );
}
