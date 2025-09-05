import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function InteractiveGrid() {
  const [hoveredCell, setHoveredCell] = useState(null);

  const handleMouseEnter = useCallback((index) => {
    setHoveredCell(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCell(null);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 gap-0.5">
        {Array.from({ length: 400 }, (_, i) => (
          <motion.div
            key={i}
            className="bg-blue-500/10 rounded-sm pointer-events-auto"
            animate={{
              opacity: hoveredCell !== null && Math.abs(hoveredCell - i) < 20 ? 0.3 : 0.05,
              scale: hoveredCell === i ? 1.2 : 1,
            }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
    </div>
  );
}