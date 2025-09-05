import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TypewriterText({ text, delay = 0, speed = 100, className }) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.substring(0, i + 1));
          i++;
        } else {
          setIsComplete(true);
          clearInterval(typingInterval);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: isComplete ? 0 : [1, 0] }}
        transition={{ duration: 0.5, repeat: isComplete ? 0 : Infinity }}
        className="inline-block w-0.5 h-[1em] bg-current ml-1"
      />
    </span>
  );
}