"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface GlobalLoaderProps {
  isVisible: boolean;
}

export const GlobalLoader = ({ isVisible }: GlobalLoaderProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md"
        >
          <div className="relative">
            {/* Pulsing and Scaling Logo */}
            <motion.div
              animate={{ 
                scale: [0.8, 1.1, 0.8],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut" 
              }}
              className="w-24 h-24 flex items-center justify-center"
            >
              <img 
                src="/logo-without-text.png" 
                alt="Loading..." 
                className="w-full h-full object-contain"
              />
            </motion.div>
            
            {/* Optional glow effect */}
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0, 0.2, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 m-auto w-16 h-16 bg-blue-500 rounded-full blur-2xl -z-10"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
