"use client";
import React from "react";
import { motion } from "framer-motion";

export default function FuturisticBackground() {
  // A smooth, irregular organic shape created with cubic beziers
  const pathString = "M -80 0 C -60 -60, 40 -80, 80 -20 C 110 30, 50 90, -10 80 C -70 70, -100 60, -80 0 Z";
  
  return (
    <div className="absolute top-0 right-0 w-[600px] h-[600px] md:w-[900px] md:h-[900px] pointer-events-none -z-10 opacity-30 mix-blend-screen translate-x-1/4 -translate-y-1/4">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" /> {/* blue-500 */}
            <stop offset="50%" stopColor="#8b5cf6" /> {/* violet-500 */}
            <stop offset="100%" stopColor="#06b6d4" /> {/* cyan-500 */}
          </linearGradient>
          
          {/* Multi-layered blur for that soft neon light spread */}
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g 
          filter="url(#neon-glow)"
          stroke="url(#neon-gradient)"
          fill="none"
          initial={{ rotate: 0, scale: 0.95 }}
          animate={{ rotate: 10, scale: 1.05 }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          {/* 
            Center the shape to 100,100. 
            Each inner line scales down and rotates slightly more, 
            creating a 3D-like spiraling contour effect.
          */}
          <g transform="translate(100, 100)">
            <path d={pathString} transform="scale(1) rotate(0)" strokeWidth="0.4" opacity="0.9" />
            <path d={pathString} transform="scale(0.9) rotate(3)" strokeWidth="0.35" opacity="0.8" />
            <path d={pathString} transform="scale(0.8) rotate(6)" strokeWidth="0.3" opacity="0.7" />
            <path d={pathString} transform="scale(0.7) rotate(9)" strokeWidth="0.25" opacity="0.6" />
            <path d={pathString} transform="scale(0.6) rotate(12)" strokeWidth="0.2" opacity="0.5" />
            <path d={pathString} transform="scale(0.5) rotate(15)" strokeWidth="0.15" opacity="0.4" />
            <path d={pathString} transform="scale(0.4) rotate(18)" strokeWidth="0.1" opacity="0.3" />
            <path d={pathString} transform="scale(0.3) rotate(21)" strokeWidth="0.05" opacity="0.2" />
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
