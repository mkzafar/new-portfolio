import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Terminal, Code, Cpu, Calculator } from "lucide-react";

import ParticleField from "@/components/landing/ParticleField";
import InteractiveGrid from "@/components/landing/InteractiveGrid";
import TypewriterText from "@/components/landing/TypewriterText";

export default function LandingPage({ onEnter }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSkills, setShowSkills] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkills(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex flex-col items-center justify-center text-white z-20 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* Background layers */}
      <ParticleField zIndexClass="z-0" />
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none">
         <InteractiveGrid />
       </div>

      {/* Dynamic Background Gradient that follows mouse */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: `radial-gradient(800px circle at ${50 + mousePosition.x * 25}% ${50 + mousePosition.y * 25}%, rgba(59, 130, 246, 0.15), transparent)`,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.2 }}
      />
      
      {/* Main Content */}
      <div className="text-center z-10 relative">
        {/* Glowing accent behind name */}
        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 scale-150" />
        
        <motion.div
          className="mb-8 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        >
          {/* Title with enhanced styling */}
          <div className="relative">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-2 relative">
              <motion.span 
                className="bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-2xl"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Muhammad
              </motion.span>
            </h1>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter relative">
              <motion.span 
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-2xl"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 8, repeat: Infinity, delay: 0.5 }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Zafar
              </motion.span>
            </h1>
            
            {/* Subtle glow effects */}
            <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 scale-110" />
          </div>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <p className="text-xl md:text-2xl text-blue-200 mb-4 tracking-wide font-light">
            <TypewriterText 
              text="Computer Engineering Student" 
              delay={1500}
              speed={80}
            />
          </p>
          
          {showSkills && (
            <motion.div
              className="flex justify-center gap-6 text-sm md:text-base text-blue-300/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                <TypewriterText text="Software Development" delay={0} speed={60} />
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <TypewriterText text="Al & ML" delay={800} speed={60} />
              </div>
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                <TypewriterText text="Quantitative Finance" delay={1600} speed={60} />
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.button
          onClick={onEnter}
          className="group relative bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-white/20 px-10 py-4 rounded-full text-white hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Button inner glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <span className="flex items-center gap-3 text-lg font-medium relative z-10">
            Explore My Work
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </motion.div>
          </span>
          
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              background: [
                "linear-gradient(0deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
                "linear-gradient(120deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
                "linear-gradient(240deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
                "linear-gradient(360deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.button>
      </div>

      {/* Floating Status Indicators */}
      <motion.div
        className="absolute top-8 right-8 flex flex-col gap-3"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300">Open to Opportunities</span>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300">Available for Internships</span>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center text-blue-300/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs tracking-wider mb-2"
        >
          SCROLL TO EXPLORE
        </motion.div>
        <div className="w-px h-8 bg-gradient-to-b from-blue-400 to-transparent" />
      </motion.div>
    </motion.div>
  );
}
