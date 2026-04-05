"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import PreLoader from "@/components/PreLoader";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  // Yeh function tab trigger hoga jab PreLoader ki 
  // GSAP animation poori khatam ho jayegi
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} scroll-smooth`}>
      <body className="bg-[#0a0a0a] text-white antialiased overflow-x-hidden">
        
        <AnimatePresence mode="wait">
          {isLoading && (
            <PreLoader 
              key="loader" 
              onComplete={handleLoadingComplete} 
            />
          )}
        </AnimatePresence>

        {/* Content Reveal with Stagger or Simple Fade */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 1.2, 
                ease: [0.22, 1, 0.36, 1] // Custom Cubic Bezier for premium feel
            }}
          >
            <Navbar />
            <main>{children}</main>
          </motion.div>
        )}
      </body>
    </html>
  );
}