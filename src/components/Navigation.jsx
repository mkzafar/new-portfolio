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
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(224,218,205,0.88)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(200,190,170,0.35)",
          boxShadow: "0 1px 16px rgba(0,0,0,0.06)",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">

            {/* Brand */}
            <button
              onClick={() => onPageChange('landing')}
              className="flex items-center gap-2 font-bold group focus:outline-none rounded transition-all duration-200"
              style={{ fontSize: "1.2rem", fontFamily: "'Georgia', serif", color: "#292524", padding: "4px 8px", borderRadius: 6 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#5a5a4a";
                e.currentTarget.style.background = "rgba(90,90,74,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#292524";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              MZ
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  isActive={currentPage === item.id}
                  onClick={() => handlePageChange(item.id)}
                />
              ))}

              <div className="ml-3 pl-3 flex items-center gap-1"
                style={{ borderLeft: "1px solid rgba(200,190,170,0.5)" }}>
                <a
                  href="https://github.com/mkzafar"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2 rounded-md text-stone-500 hover:text-stone-800 transition-colors"
                  style={{ ":hover": { background: "rgba(200,190,170,0.3)" } }}
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mkzafar23/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-md text-stone-500 hover:text-stone-800 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed top-[68px] left-0 right-0 z-40 md:hidden"
          style={{
            background: "rgba(224,218,205,0.97)",
            borderBottom: "1px solid rgba(200,190,170,0.4)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
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
                  className="text-left px-3 py-2 rounded-md font-medium transition-colors text-sm"
                  style={{
                    color: isActive ? "#2a2a20" : "#6b6354",
                    background: isActive ? "rgba(200,190,170,0.3)" : "transparent",
                  }}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="flex items-center gap-4 pt-3 mt-1"
              style={{ borderTop: "1px solid rgba(200,190,170,0.3)" }}>
              <a href="https://github.com/mkzafar" target="_blank" rel="noopener noreferrer"
                className="p-2 text-stone-500 hover:text-stone-800 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/mkzafar23/" target="_blank" rel="noopener noreferrer"
                className="p-2 text-stone-500 hover:text-stone-800 transition-colors">
                <Linkedin className="w-5 h-5" />
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
      className="relative group px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none"
      style={{ color: isActive ? "#2a2a20" : "#6b6354" }}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="relative z-10">{label}</span>

      {/* active / hover underline */}
      <span
        className="pointer-events-none absolute left-3 right-3 bottom-1 h-px transition-all duration-200 origin-center"
        style={{
          background: "#3d3d30",
          opacity: isActive ? 0.6 : 0,
          transform: isActive ? "scaleX(1)" : "scaleX(0)",
        }}
      />
      {/* hover underline via CSS group trick — handled with inline onMouseEnter since Tailwind can't do arbitrary colors */}
    </button>
  );
}